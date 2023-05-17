import { Binder, field } from '@hilla/form';
import { EndpointError } from '@hilla/frontend';
import '@vaadin/button';
import '@vaadin/date-picker';
import '@vaadin/date-time-picker';
import '@vaadin/form-layout';
import '@vaadin/grid';
import type { Grid, GridDataProviderCallback, GridDataProviderParams } from '@vaadin/grid';
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
import SampleAddress from 'Frontend/generated/com/example/application/data/entity/SampleAddress';
import SampleAddressModel from 'Frontend/generated/com/example/application/data/entity/SampleAddressModel';
import type Sort from 'Frontend/generated/dev/hilla/mappedtypes/Sort.js';
import Direction from 'Frontend/generated/org/springframework/data/domain/Sort/Direction.js';
import * as SampleAddressEndpoint from 'Frontend/generated/SampleAddressEndpoint';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { View } from '../view.js';

@customElement('master-detail-sample-address-lit-view')
export class MasterDetailSampleAddressLitView extends View {
  @query('#grid')
  private grid!: Grid;

  @property({ type: Number })
  private gridSize = 0;

  private gridDataProvider = this.getGridData.bind(this);

  private binder = new Binder<SampleAddress, SampleAddressModel>(this, SampleAddressModel);

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
            <vaadin-grid-sort-column path="street" auto-width></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="postalCode" auto-width></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="city" auto-width></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="state" auto-width></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="country" auto-width></vaadin-grid-sort-column>
          </vaadin-grid>
        </div>
        <div class="editor-layout">
          <div class="editor">
            <vaadin-form-layout
              ><vaadin-text-field label="Street" id="street" ${field(this.binder.model.street)}></vaadin-text-field
              ><vaadin-text-field
                label="Postal code"
                id="postalCode"
                ${field(this.binder.model.postalCode)}
              ></vaadin-text-field
              ><vaadin-text-field label="City" id="city" ${field(this.binder.model.city)}></vaadin-text-field
              ><vaadin-text-field label="State" id="state" ${field(this.binder.model.state)}></vaadin-text-field
              ><vaadin-text-field label="Country" id="country" ${field(this.binder.model.country)}></vaadin-text-field
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
    params: GridDataProviderParams<SampleAddress>,
    callback: GridDataProviderCallback<SampleAddress | undefined>
  ) {
    const sort: Sort = {
      orders: params.sortOrders.map((order) => ({
        property: order.path,
        direction: order.direction == 'asc' ? Direction.ASC : Direction.DESC,
        ignoreCase: false,
      })),
    };
    const data = await SampleAddressEndpoint.list({ pageNumber: params.page, pageSize: params.pageSize, sort });
    callback(data);
  }

  async connectedCallback() {
    super.connectedCallback();
    this.gridSize = (await SampleAddressEndpoint.count()) ?? 0;
  }

  private async itemSelected(event: CustomEvent) {
    const item: SampleAddress = event.detail.value as SampleAddress;
    this.grid.selectedItems = item ? [item] : [];

    if (item) {
      const fromBackend = await SampleAddressEndpoint.get(item.id!);
      fromBackend ? this.binder.read(fromBackend) : this.refreshGrid();
    } else {
      this.clearForm();
    }
  }

  private async save() {
    try {
      const isNew = !this.binder.value.id;
      await this.binder.submitTo(SampleAddressEndpoint.update);
      if (isNew) {
        // We added a new item
        this.gridSize++;
      }
      this.clearForm();
      this.refreshGrid();
      Notification.show(`SampleAddress details stored.`, { position: 'bottom-start' });
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
