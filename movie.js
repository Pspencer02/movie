class StarRating {
  constructor(container) {
      this.container = container;
      this.stars = [];
      this.rating = 0;
      this.createStars();
  }

  // Method to create star elements
  createStars() {
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.textContent = '★';
        star.classList.add('star');
        star.dataset.ratingValue = i;
        star.addEventListener('mouseenter', () => {
            this.highlightStars(i);
        });
        star.addEventListener('mouseleave', () => {
            this.highlightStars(this.rating);
        });
        star.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent event propagation
            this.setRating(i);
        });
        this.stars.push(star);
        this.container.appendChild(star);

        star.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent event propagation
            console.log('Star clicked:', i); // Add this line to check if click events are triggered
            this.setRating(i);
        });

    }
  }


  // Method to set the rating
  setRating(rating) {
      this.rating = rating;
      this.highlightStars(rating);
  }

  // Method to highlight stars based on rating
  highlightStars(rating) {
      this.stars.forEach(star => {
          const starValue = parseInt(star.dataset.ratingValue);
          if (starValue <= rating) {
              star.classList.add('filled');
          } else {
              star.classList.remove('filled');
          }
      });
  }

  // Method to get the current rating
  getRating() {
      return this.rating;
  }
}

class Movie {
  constructor(title, image, synopsis, rating) {
      // Initialize movie properties
      this.title = title;
      this.image = image;
      this.synopsis = synopsis;
      this.rating = rating;
      this.reviews = []; // Array to store reviews
  }

  // Method to add a new review to the movie
  addReview(review) {
      this.reviews.push(review);
  }

  // Method to render the movie details, reviews, rating, and review form
  render() {
      // Create movie container element
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');

      // Add image element
      const imageElement = document.createElement('img');
      imageElement.src = this.image;
      movieElement.appendChild(imageElement);

      // Add title element
      const titleElement = document.createElement('h2');
      titleElement.textContent = this.title;
      movieElement.appendChild(titleElement);

      // Add synopsis element
      const synopsisElement = document.createElement('p');
      synopsisElement.textContent = this.synopsis;
      movieElement.appendChild(synopsisElement);

      // Add rating element
      const ratingElement = document.createElement('div');
      ratingElement.textContent = 'Rating: ';
      const starRatingContainer = document.createElement('div');
      const starRating = new StarRating(starRatingContainer);
      starRating.setRating(this.rating);
      ratingElement.appendChild(starRatingContainer);
      movieElement.appendChild(ratingElement);

      // Add review list element
      const reviewList = document.createElement('div');
      reviewList.classList.add('review-list');
      // Iterate over reviews and create review elements
      this.reviews.forEach(review => {
          const reviewElement = document.createElement('div');
          reviewElement.textContent = review;
          reviewList.appendChild(reviewElement);
      });
      movieElement.appendChild(reviewList);

      // Add review form element
      const reviewForm = document.createElement('form');
      const reviewInput = document.createElement('textarea');
      reviewInput.placeholder = 'Write your review here';
      reviewForm.appendChild(reviewInput);

      // Add submit button to review form
      const submitButton = document.createElement('button');
      submitButton.textContent = 'Submit Review';
      submitButton.addEventListener('click', (event) => {
          event.preventDefault();
          const newReview = reviewInput.value;
          // Add new review only if it's not empty
          if (newReview.trim() !== '') {
              this.addReview(newReview);
              // Clear existing reviews and re-render
              reviewList.innerHTML = '';
              this.reviews.forEach(review => {
                  const reviewElement = document.createElement('div');
                  reviewElement.textContent = review;
                  reviewList.appendChild(reviewElement);
              });
              reviewInput.value = ''; // Clear input field after submission
          }
      });
      reviewForm.appendChild(submitButton);

      movieElement.appendChild(reviewForm);

      return movieElement;
  }
}

// Sample movie data
const moviesData = [
  {
      title: 'Ponyo',
      image: 'ponyo.jpg',
      synopsis: 'A story about a magical fish who wishes to become a human girl in order to spend her days with her best friend.',
      rating: 4
  },
  {
      title: 'A Silent Voice ',
      image: 'a_silent_voice.jpg',
      synopsis: 'A young man is ostracized by his classmates after he bullies a deaf girl to the point where she moves away. Years later, he sets off on a path for redemption. ',
      rating: 5
  }
];

class MovieList {
  constructor(containerId, movies) {
      this.container = document.getElementById(containerId); // Container element to render movies
      this.movies = movies; // Array of movie data
  }

  // Method to render all movies in the container
  render() {
      this.movies.forEach(movieData => {
          const movie = new Movie(movieData.title, movieData.image, movieData.synopsis, movieData.rating);
          this.container.appendChild(movie.render());
      });
  }
}

// Render movies
const movieList = new MovieList('movie-container', moviesData);
movieList.render();
