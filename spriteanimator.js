class SpriteAnimator{
    constructor(element, frames, frameDuration = 150, loop = true){
    this.element = element //img element
    this.frames = frames //array of image URLs
    this.frameDuration = frameDuration //duration of each frame, ms per frame
    this.loop = loop 
    this.currentFrame = 0
    this.intervalId = null
}

play(callback = null){
    this.stop() //stop any existing animation; prevents double loops
    this.currentFrame = 0 //reset to first frame
    this.intervalId = setInterval(() => {
        this.element.src = this.frames[this.currentFrame]
        this.currentFrame++
        if(this.currentFrame >= this.frames.length){
            if(this.loop){
                this.currentFrame = 0 //restart
            } else {
                this.stop()
                if(callback) callback() //call callback if provided
            }
        }
    }, this.frameDuration)
}

stop(){
    if(this.intervalId){
        clearInterval(this.intervalId)
        this.intervalId = null
    }
}
}


const animationFrames = ["assets/frame0000-removebg-preview.png","assets/frame0001-removebg-preview.png", "assets/frame0002-removebg-preview.png"]
const imgElement = document.getElementById("Drawing")
const animator = new SpriteAnimator(imgElement, animationFrames, 600, true)
animator.play()