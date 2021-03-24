document.addEventListener("DOMContentLoaded", main);

function main(){
  initYoutubeVideos(".yt-video");
  initMobileMenuToggling(".main-menu");
  initBackToTopButtonActions(".back-to-top-button");
  initSlider(".slider");
}


/* -------------------------------- */
/* FUNCTIONS
/* -------------------------------- */
function initSlider(sliderBlockSelector){
  let sliderBlock = document.querySelector(sliderBlockSelector);

  if(sliderBlock){
    handleSlider(sliderBlock);
  }

  // Functions
  function handleSlider(sliderBlock){
    let selectors = {
      directionNext: ".slider__controls-direction .next",
      directionPrev: ".slider__controls-direction .prev",
      paggingItem: ".slider__controls-pagging button",
      slide: ".slides__item"
    };

    let activeClasses = {
      slideActive: "current",
      paggingItemActive: "current"
    };

    let slides = sliderBlock.querySelectorAll(selectors.slide);
    let slidesTotal = slides.length;
    let slidesCounter = 0;

    let paggingItems = sliderBlock.querySelectorAll(selectors.paggingItem);
    handlePagging(paggingItems);

    let directionNext = sliderBlock.querySelector(selectors.directionNext);
    let directionPrev = sliderBlock.querySelector(selectors.directionPrev);

    handleDirectionControls({
      next: directionNext,
      prev: directionPrev
    });

    // Functions
    function handleDirectionControls(controls){
      let {next, prev} = controls;

      next.addEventListener("click", function(e){
        e.preventDefault();
        e.stopPropagation();

        removeActiveClass(paggingItems, activeClasses.paggingItemActive);
        removeActiveClass(slides, activeClasses.slideActive);

        slidesCounter++;

        if(slidesCounter < slidesTotal){
          paggingItems[slidesCounter].classList.add(activeClasses.paggingItemActive);
          slides[slidesCounter].classList.add(activeClasses.slideActive);
        } else {
          slidesCounter = 0;

          paggingItems[slidesCounter].classList.add(activeClasses.paggingItemActive);
          slides[slidesCounter].classList.add(activeClasses.slideActive);
        }
        
      });

      prev.addEventListener("click", function(e){
        e.preventDefault();
        e.stopPropagation();

        removeActiveClass(paggingItems, activeClasses.paggingItemActive);
        removeActiveClass(slides, activeClasses.slideActive);

        slidesCounter--;

        if(slidesCounter >= 0){
          paggingItems[slidesCounter].classList.add(activeClasses.paggingItemActive);
          slides[slidesCounter].classList.add(activeClasses.slideActive);
        } else {
          slidesCounter = slidesTotal - 1;

          paggingItems[slidesCounter].classList.add(activeClasses.paggingItemActive);
          slides[slidesCounter].classList.add(activeClasses.slideActive);
        }
      });
    }

    function handlePagging(paggingItems){
      paggingItems.forEach(function(item, i){
        item.addEventListener("click", function(e){
          e.preventDefault();
          e.stopPropagation();

          removeActiveClass(paggingItems, activeClasses.paggingItemActive);
          removeActiveClass(slides, activeClasses.slideActive);

          item.classList.add(activeClasses.paggingItemActive);
          slides[i].classList.add(activeClasses.slideActive);

          slidesCounter = i;
        });
      });
    }
  }
}

function removeActiveClass(elements, activeClass){
  let totalElements = elements.length;

  for(let i = 0; i < totalElements; i++){
    let element = elements[i];

    if(element.classList.contains(activeClass)){
      element.classList.remove(activeClass);
      return;
    }
  }
}

function initBackToTopButtonActions(buttonSelector){
  let backToTopButton = document.querySelector(buttonSelector);

  if(backToTopButton){
    backToTopButton.addEventListener("click", function(e){
      e.preventDefault();
      e.stopPropagation();

      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
  }
}

function initMobileMenuToggling(menuSelector){
  let menu = document.querySelector(menuSelector);

  if(menu){
    handleMobileMenuToggling(menu);
  }

  function handleMobileMenuToggling(menu){
    let elementsSelectors = {
      mobileButton: ".main-menu__mobile-dropdown-button",
      navList: ".main-menu__nav-list"
    };

    let classNames = {
      navListVisible: "visible"
    }

    let mobileButton = menu.querySelector(elementsSelectors.mobileButton);
    let navList = menu.querySelector(elementsSelectors.navList);

    mobileButton.addEventListener("click", function(e){
      e.preventDefault();
      e.stopPropagation();

      navList.classList.toggle(classNames.navListVisible);
    });
  }
}

function initYoutubeVideos(videosWrapperSelector){
  let videos = document.querySelectorAll(videosWrapperSelector);
  let videosTotal = videos.length;

  if(videosTotal){
    handleYoutubeVideos(videos);
  }

  function handleYoutubeVideos(videos){
    let videoPlayButtonSelector = ".yt-video__play-button";
    videos = Array.from(videos);

    videos.forEach(function(video){
      let playButton = video.querySelector(videoPlayButtonSelector);

      initVideoCover(playButton);
      setPlayButtonActions(playButton);
    });
  }

  function setPlayButtonActions(button){
    button.addEventListener("click", function(e){
      e.preventDefault();
      e.stopPropagation();

      let youtubeEmbedId = this.dataset.embed;
      let videoFrame = createVideoFrame(youtubeEmbedId);

      this.parentElement.append(videoFrame);
      this.remove();
    });
  }

  function initVideoCover(elementWithDataEmbed){
    let youtubeEmbedId = elementWithDataEmbed.dataset.embed;
    let coverSource = `https://img.youtube.com/vi/${youtubeEmbedId}/sddefault.jpg`;

    elementWithDataEmbed.parentElement.style.backgroundImage = `url(${coverSource})`;
  }

  function createVideoFrame(youtubeEmbedId){
    let iframe = document.createElement( "iframe" );

    iframe.setAttribute( "frameborder", "0" );
    iframe.setAttribute( "allowfullscreen", "" );
    iframe.setAttribute( "src", `https://www.youtube.com/embed/${youtubeEmbedId}?rel=0&showinfo=0&autoplay=1` );
    
    return iframe;
  }
}