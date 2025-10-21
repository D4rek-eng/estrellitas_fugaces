;(function (window) {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
  
    const FRAME_RATE = 50
    const PARTICLE_NUM = 5000
    const RADIUS = Math.PI * 2
    let CANVASWIDTH = window.innerWidth
    let CANVASHEIGHT = 150
    const CANVASID = 'canvas'
    
     let texts = [
    'Hola niña de sonrisa preciosa',
    'Conocerte es y será hermoso',
    'pero aún más hermoso',
    'es que cada día',
    'estás en mi vida',
    'Te amo muchísimo',
    'Hola amorcito',
    'para decirte que Darek',
    'te hizo esto porque',
    'te ama con todo su corazón ♡',
    'Eres la persona más linda',
    'que he conocido',
    'y quiero que siempre sonrías',
    'Me encantas demasiado',
    'confío en ti y en nosotros',
    'Y sobre todo, te prometo cuidarte y amarte',
    'Eres mi persona favorita 💖'
  ];
  
    let canvas,
      ctx,
      particles = [],
      quiver = true,
      text = texts[0],
      textIndex = 0,
      textSize = (window.innerWidth <= 768) ? 
        Math.max(28, Math.min(60, window.innerWidth / 12)) : 
        Math.max(24, Math.min(100, window.innerWidth / 15))
  
    function draw () {
      ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)
      
      // Set font first
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
      ctx.font = 'bold ' + textSize + 'px \'Arial\', \'Helvetica Neue\', \'sans-serif\''
      
      // Draw background for better text readability
      const textWidth = ctx.measureText(text).width
      const padding = 20
      const bgWidth = textWidth + padding * 2
      const bgHeight = textSize + padding
      
      // Draw solid background for better readability
      ctx.fillStyle = 'rgba(0, 0, 0, 0.9)'
      ctx.fillRect(
        CANVASWIDTH * 0.5 - bgWidth * 0.5, 
        CANVASHEIGHT * 0.5 - bgHeight * 0.5, 
        bgWidth, 
        bgHeight
      )
      
      // Add border for better definition
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.lineWidth = 1
      ctx.strokeRect(
        CANVASWIDTH * 0.5 - bgWidth * 0.5, 
        CANVASHEIGHT * 0.5 - bgHeight * 0.5, 
        bgWidth, 
        bgHeight
      )
      
      // Draw text with strong contrast
      ctx.fillStyle = 'rgb(255, 255, 255)'
      ctx.fillText(text, CANVASWIDTH * 0.5, CANVASHEIGHT * 0.5)
      
      // Draw subtle particles in background only (not interfering with text)
      for (let i = 0, l = particles.length; i < l; i++) {
        let p = particles[i]
        if (!p.inText) {
          p.fadeOut()
          p.draw(ctx)
        }
      }
  
      window.requestAnimationFrame(draw)
    }
  
    // Removed particleText function to make text readable
  
    function setDimensions () {
      CANVASWIDTH = window.innerWidth
      CANVASHEIGHT = Math.max(120, window.innerHeight * 0.25)
      
      canvas.width = CANVASWIDTH
      canvas.height = CANVASHEIGHT
      canvas.style.position = 'absolute'
      canvas.style.left = '0%'
      canvas.style.top = '0%'
      canvas.style.bottom = '0%'
      canvas.style.right = '0%'
      canvas.style.marginTop = window.innerHeight * .15 + 'px'
    }
  
    function event () {
      document.addEventListener('click', function (e) {
        textIndex++
        if (textIndex >= texts.length) {
          textIndex--
          return
        }
        text = texts[textIndex]
        console.log(textIndex)
      }, false)
  
      document.addEventListener('touchstart', function (e) {
        textIndex++
        if (textIndex >= texts.length) {
          textIndex--
          return
        }
        text = texts[textIndex]
        console.log(textIndex)
      }, false)
      
      window.addEventListener('resize', function() {
        setDimensions()
        textSize = (window.innerWidth <= 768) ? 
          Math.max(28, Math.min(60, window.innerWidth / 12)) : 
          Math.max(24, Math.min(100, window.innerWidth / 15))
        // Recreate particles for new dimensions
        particles = []
        for (var i = 0; i < PARTICLE_NUM; i++) {
          particles[i] = new Particle(canvas)
        }
      }, false)
    }
  
    function init () {
      canvas = document.getElementById(CANVASID)
      if (canvas === null || !canvas.getContext) {
        return
      }
      ctx = canvas.getContext('2d')
      setDimensions()
      event()
  
      for (var i = 0; i < PARTICLE_NUM; i++) {
        particles[i] = new Particle(canvas)
      }
  
      draw()
    }
  
    class Particle {
      constructor (canvas) {
        let spread = canvas.height
        let size = Math.random() * 1.2
        
        this.delta = 0.06
        
        this.x = 0
        this.y = 0
        
        this.px = Math.random() * canvas.width
        this.py = (canvas.height * 0.5) + ((Math.random() - 0.5) * spread)
        
        this.mx = this.px
        this.my = this.py
        
        this.size = size
        
        this.inText = false
        
        this.opacity = 0
        this.fadeInRate = 0.005
        this.fadeOutRate = 0.03
        this.opacityTresh = 0.98
        this.fadingOut = true
        this.fadingIn = true
      }
      fadeIn () {
        this.fadingIn = this.opacity > this.opacityTresh ? false : true
        if (this.fadingIn) {
          this.opacity += this.fadeInRate
        }else {
          this.opacity = 1
        }
      }
      fadeOut () {
        this.fadingOut = this.opacity < 0 ? false : true
        if (this.fadingOut) {
          this.opacity -= this.fadeOutRate
          if (this.opacity < 0) {
            this.opacity = 0
          }
        }else {
          this.opacity = 0
        }
      }
      draw (ctx) {
        // Make particles more subtle and less interfering
        ctx.fillStyle = 'rgba(226,225,142, ' + (this.opacity * 0.6) + ')'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 0.8, 0, RADIUS, true)
        ctx.closePath()
        ctx.fill()
      }
    }
    
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
      if(!isChrome){
        $('#iframeAudio').remove()
    }
    
    // setTimeout(() => {
      init()  
    // }, 4000);
  })(window)
