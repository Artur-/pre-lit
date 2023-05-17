import type { ArrayModel, NumberModel } from '@hilla/form';
import { Binder, field } from '@hilla/form';
import type { BinderNode } from '@hilla/form/BinderNode.js';
import { EndpointError } from '@hilla/frontend';
import '@vaadin/button';
import '@vaadin/date-picker';
import '@vaadin/date-time-picker';
import '@vaadin/form-layout';
import '@vaadin/grid';
import type { Grid, GridDataProviderCallback, GridDataProviderParams } from '@vaadin/grid';
import { columnBodyRenderer } from '@vaadin/grid/lit';
import '@vaadin/grid/vaadin-grid-sort-column';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/notification';
import { Notification } from '@vaadin/notification';
import '@vaadin/polymer-legacy-adapter';
import '@vaadin/split-layout';
import '@vaadin/text-field';
import '@vaadin/upload';
import type { Upload, UploadFile } from '@vaadin/upload';
import SampleBook from 'Frontend/generated/com/example/application/data/entity/SampleBook';
import SampleBookModel from 'Frontend/generated/com/example/application/data/entity/SampleBookModel';
import type Sort from 'Frontend/generated/dev/hilla/mappedtypes/Sort.js';
import Direction from 'Frontend/generated/org/springframework/data/domain/Sort/Direction.js';
import * as SampleBookEndpoint from 'Frontend/generated/SampleBookEndpoint';
import { imageDataUrl } from 'Frontend/util.js';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';
import { View } from '../view.js';

@customElement('master-detail-sample-book-lit-view')
export class MasterDetailSampleBookLitView extends View {
  @query('#grid')
  private grid!: Grid;

  @property({ type: Number })
  private gridSize = 0;

  private gridDataProvider = this.getGridData.bind(this);

  private binder = new Binder<SampleBook, SampleBookModel>(this, SampleBookModel);

  render() {
    return html`
      <vaadin-split-layout>
        <div class="grid-wrapper">
          <vaadin-grid
            id="grid"
            theme="no-border"
            .size=${this.gridSize}
            .dataProvider=${this.gridDataProvider}
            @active-item-changed=${this.itemSelected}
          >
            <vaadin-grid-column
              path="image"
              width="68px"
              flex-grow="0"
              ${columnBodyRenderer<SampleBook>(
                (item) => html`<img style="height: 64px" src="${until(imageDataUrl(item.image))}" />`
              )}
            ></vaadin-grid-column>
            <vaadin-grid-sort-column path="name" auto-width></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="author" auto-width></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="publicationDate" auto-width></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="pages" auto-width></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="isbn" auto-width></vaadin-grid-sort-column>
          </vaadin-grid>
        </div>
        <div class="editor-layout">
          <div class="editor">
            <vaadin-form-layout
              ><label>Image</label>
              <vaadin-upload
                accept="image/*"
                max-files="1"
                style="box-sizing: border-box"
                id="image"
                @upload-request="${(e: CustomEvent) =>
                  this.handleImageUpload(e, this.binder.for(this.binder.model.image))}"
                ><img
                  class="w-full"
                  ?hidden="${!this.binder.value.image?.length}"
                  src="${until(imageDataUrl(this.binder.value.image))}"
                /> </vaadin-upload
              ><vaadin-text-field label="Name" id="name" ${field(this.binder.model.name)}></vaadin-text-field
              ><vaadin-text-field label="Author" id="author" ${field(this.binder.model.author)}></vaadin-text-field
              ><vaadin-date-picker
                label="Publication date"
                id="publicationDate"
                ${field(this.binder.model.publicationDate)}
              ></vaadin-date-picker
              ><vaadin-text-field label="Pages" id="pages" ${field(this.binder.model.pages)}></vaadin-text-field
              ><vaadin-text-field label="Isbn" id="isbn" ${field(this.binder.model.isbn)}></vaadin-text-field
            ></vaadin-form-layout>
          </div>
          <vaadin-horizontal-layout class="button-layout">
            <vaadin-button theme="primary" @click=${this.save}>Save</vaadin-button>
            <vaadin-button theme="tertiary" @click=${this.cancel}>Cancel</vaadin-button>
          </vaadin-horizontal-layout>
        </div>
      </vaadin-split-layout>
    `;
  }

  private async getGridData(
    params: GridDataProviderParams<SampleBook>,
    callback: GridDataProviderCallback<SampleBook | undefined>
  ) {
    const sort: Sort = {
      orders: params.sortOrders.map((order) => ({
        property: order.path,
        direction: order.direction == 'asc' ? Direction.ASC : Direction.DESC,
        ignoreCase: false,
      })),
    };
    const data = await SampleBookEndpoint.list({ pageNumber: params.page, pageSize: params.pageSize, sort });
    callback(data);
  }

  async connectedCallback() {
    super.connectedCallback();
    this.gridSize = (await SampleBookEndpoint.count()) ?? 0;
  }

  private async itemSelected(event: CustomEvent) {
    const item: SampleBook = event.detail.value as SampleBook;
    this.grid.selectedItems = item ? [item] : [];

    if (item) {
      const fromBackend = await SampleBookEndpoint.get(item.id!);
      fromBackend ? this.binder.read(fromBackend) : this.refreshGrid();
    } else {
      this.clearForm();
    }
  }

  private async handleImageUpload(
    e: CustomEvent,
    binderNode: BinderNode<ReturnType<ArrayModel<number, NumberModel>['valueOf']>, ArrayModel<number, NumberModel>>
  ) {
    e.preventDefault();
    const upload: Upload = e.target as Upload;
    const file: UploadFile = e.detail.file;
    const fileByteArray: number[] = [];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async (evt) => {
      if (evt.target && evt.target.readyState == FileReader.DONE) {
        const arrayBuffer = evt.target.result;
        const array = new Uint8Array(arrayBuffer as ArrayBuffer);

        for (let i = 0; i < array.length; i++) {
          fileByteArray.push(array[i]);
        }
        binderNode.value = fileByteArray;
        await this.requestUpdate('binder');
        upload.files = [];
      }
    };
  }

  private async save() {
    try {
      const isNew = !this.binder.value.id;
      await this.binder.submitTo(SampleBookEndpoint.update);
      if (isNew) {
        // We added a new item
        this.gridSize++;
      }
      this.clearForm();
      this.refreshGrid();
      Notification.show(`SampleBook details stored.`, { position: 'bottom-start' });
    } catch (error: any) {
      if (error instanceof EndpointError) {
        Notification.show(`Server error. ${error.message}`, { theme: 'error', position: 'bottom-start' });
      } else {
        throw error;
      }
    }
  }

  private cancel() {
    this.grid.activeItem = undefined;
  }

  private clearForm() {
    this.binder.clear();
  }

  private refreshGrid() {
    this.grid.selectedItems = [];
    this.grid.clearCache();
  }
}
