import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { selectImageAction, searchMediaAction, selectVideoAction } from '../actions/mediaActions';
import PhotosPage from '../components/PhotoPage';
import VideosPage from '../components/VideoPage';
import '../styles/style.css';

class MediaGalleryPage extends Component {

  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelectImage = this.handleSelectImage.bind(this);
    this.handleSelectVideo = this.handleSelectVideo.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(searchMediaAction('rain'));
  }

  // Dispatches *selectImageAction* when any image is clicked
  handleSelectImage(selectedImage) {
    this.props.dispatch(selectImageAction(selectedImage));
  }

  // Dispatches *selectvideoAction* when any video is clicked
  handleSelectVideo(selectedVideo) {
    this.props.dispatch(selectVideoAction(selectedVideo));
  }

  // Dispatches *searchMediaAction* with query param.
  // We ensure action is dispatched to the store only if query param is provided.
  handleSearch(event) {
    event.preventDefault();
    if (this.query !== null) {
      this.props.dispatch(searchMediaAction(this.query.value));
      this.query.value = '';
    }
  }


  render() {
    const { images, selectedImage, videos, selectedVideo } = this.props;
    return (
      <div className="container-fluid">
        {images && selectedImage? <div>
          <input
            type="text"
            ref={ref => (this.query = ref)}
          />
          <input
            type="submit"
            className="btn btn-primary"
            value="Search Library"
            onClick={this.handleSearch}
          />
          <div className="row">
            <PhotosPage
              images={images}
              selectedImage={selectedImage}
              onHandleSelectImage={this.handleSelectImage}
            />
            <VideosPage
              videos={videos}
              selectedVideo={selectedVideo}
              onHandleSelectVideo={this.handleSelectVideo}
            />
          </div>
        </div> : 'loading ....'}
      </div>
    );
  }
}

MediaGalleryPage.propTypes = {
  // Define your PropTypes here
  images: PropTypes.array,
  selectedImage: PropTypes.object,
  videos: PropTypes.array,
  selectedVideo: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

// Subscribe component to redux store and merge the state into component's props
const mapStateToProps = ({ images, videos }) => ({
  images: images[0],
  selectedImage: images.selectedImage,
  videos: videos[0],
  selectedVideo: videos.selectedVideo
});

// connect method from react-router connects the component with redux store
export default connect(
  mapStateToProps)(MediaGalleryPage);
