import React, { Component } from 'react'; 
import axios from 'axios'; 
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';
import { CustomLoader } from './CustomLoader';
import { Modal } from './Modal';
import { GlobalStyles } from "./GlobalStyles";

export class App extends Component {
    state = {
        query: '',
        images: [],
        page: 1,
        isLoading: false,
        showModal: false,
        modalImage: '',
    };

    fetchImages = () => {
        const { query, page } = this.state;
        const apiKey = '38476284-331f716b1abb5b5177c821f88';
        const perPage = 12;

        this.setState({ isLoading: true });

        axios
        .get(`https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`)
        .then((response) => {
            this.setState((prevState) => ({
                images: [...prevState.images, ...response.data.hits],
                page: prevState.page + 1,
            }));
        })
        .catch((error) => {
            console.error('Error fetching images:', error);
        })
        .finally(() => {
            this.setState({ isLoading: false });
        });
    };

    handleSearchSubmit = (query) => {
        this.setState({ query, images: [], page: 1 }, this.fetchImages);
    };

    handleOpenModal = (src) => {
        this.setState({ showModal: true, modalImage: src });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false, modalImage: '' });
    };

    scrollToImages = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    render() {
        const { images, isLoading, showModal, modalImage } = this.state;

        return (
            <div className='app'>
                <Searchbar onSubmit={this.handleSearchSubmit}/>
                <ImageGallery>
                    {images.map((image) => (
                    <ImageGalleryItem
                    key={image.id}
                    src={image.webformatURL}
                    alt={image.tags}
                    onClick={() => this.handleOpenModal(image.largeImageURL)}
                    />
                    ))}
                </ImageGallery>
                {isLoading && <CustomLoader/>}
                {images.length > 0 && !isLoading && (
                <Button onClick={() => this.fetchImages()}/>
                )}

                {showModal && (
                <Modal src={modalImage} alt="Modal" onClose={this.handleCloseModal}/>
                )}
                <GlobalStyles/>
            </div>
        );
    }
}