var Carousel = function(index){
    
    var carousel = document.getElementsByClassName("slider")[index];
    var group = carousel.childNodes[1];
    var slides = group.children; 
    var currentIndex = 0;
    var buttonArray = [];
    var timeout;
    
    // Pagination
    // Loop through the number of slides inside each carousel then create 
    // a DOM element and the event for each, then append to container.
    for(i = 0; i < slides.length; i++){
        
        var button = document.createElement('button');
        button.className = "slide-btn";
        var buttonText = document.createTextNode('•');
        button.appendChild(buttonText);
        
        // When script loads set the first dot to active
        if(i === currentIndex){
            button.className = "slide-btn active";
        }
        
        button.addEventListener('click', function(){
            move(i -1);
        });
        
        carousel.childNodes[3].appendChild(button);
        buttonArray.push(button);
    }
    
    // Animation, Direction and paging update 
    function move (newIndex){
        
        var animateLeft, slideLeft;
        
        // If user clicks current dot, do nothing
        if(currentIndex === newIndex){ return; }
        
        buttonArray[currentIndex].className = "slide-btn";
        buttonArray[newIndex].className = "slide-btn active";
        
        if(newIndex > currentIndex){
            slideLeft = '100%';
            animateLeft = '-940px';
        } else {
            slideLeft = '-100%';
            animateLeft = '940px';
        }

        slides[newIndex].style.left = slideLeft;
        slides[newIndex].style.display = "block";
        
        group.style.transition = "all 0.3s ease";
        group.style.left = animateLeft;
        
        setTimeout(function(){
            
            slides[newIndex].style.left = "0";
            group.style.transition = "";
            group.style.left = "";
            slides[currentIndex].style.display = "";
            
            currentIndex = newIndex;
                
        }, 1000);
        
        advance();
    }
    
    // Timing
    function advance (){
        clearTimeout(timeout);
        timeout = setTimeout(function(){
            if(currentIndex < (slides.length - 1)){
                move(currentIndex + 1)
            } else {
                move(0);
            }
        }, 4000);
    }
    advance();
};

Carousel(0);
Carousel(1);