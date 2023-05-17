package com.example.application.data.entity;

import dev.hilla.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import java.time.LocalDate;

@Entity
public class SampleBook extends AbstractEntity {

    @Lob
    @Column(length = 1000000)
    private byte @Nonnull [] image;
    @Nonnull
    private String name;
    @Nonnull
    private String author;
    private LocalDate publicationDate;
    @Nonnull
    private Integer pages;
    @Nonnull
    private String isbn;

    public byte @Nonnull [] getImage() {
        return image;
    }
    public void setImage(byte @Nonnull [] image) {
        this.image = image;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }
    public LocalDate getPublicationDate() {
        return publicationDate;
    }
    public void setPublicationDate(LocalDate publicationDate) {
        this.publicationDate = publicationDate;
    }
    public Integer getPages() {
        return pages;
    }
    public void setPages(Integer pages) {
        this.pages = pages;
    }
    public String getIsbn() {
        return isbn;
    }
    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

}
