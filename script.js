$(function () {
  var cosmicArray = document.querySelectorAll('.cosmic-container div'),
    $strawberry = $(".strawberry-container p"),
    $strawText = new SplitText($strawberry, { type: "chars" }),
    $comingSoon = $(".coming-soon p"),
    $comingText = new SplitText($comingSoon, { type: "chars" });
  var $canvas = $(".canvas"),
    canvasWidth = $canvas.outerWidth(),
    canvasHeight = $canvas.outerHeight(),
    $streak = $(".streak");

  var mtl = new TimelineMax({ repeat: -1, yoyo: true, repeatDelay: 5 });
  mtl
    .add(addCosmic(), "start")
    .add(addStraw(), "start+=.75")
    .add(shootingStar(), "start+=.75")
    .add(addSoon());

  function addCosmic() {
    var tl = new TimelineMax();
    tl.staggerFrom(
      cosmicArray,
      2,
      {
        opacity: 0,
        left: 0,
        scale: 0,
        ease: Back.easeOut
      },
      0.25
    );
    return tl;
  }

  function addStraw() {
    var tl = new TimelineMax();
    tl.staggerFrom(
      $strawText.chars,
      3,
      {
        opacity: 0,
        top: 25,
        rotationY: 360,
        ease: Elastic.easeOut,
        transformOrigin: "0% 10%"
      },
      0.1
    );
    return tl;
  }

  function addSoon() {
    var tl = new TimelineMax({ delay: 1 });

    tl.from($comingSoon, 1.5, {
      opacity: 0,
      letterSpacing: 15,
      scale: 3,
      ease: Back.easeOut,
      autoRound: false
    });

    return tl;
  }

  /*
   * Adding Stars to the Field
   */
  function starField() {
    var maxStars = 1000;
    for (var i = 0; i < maxStars; i++) {
      var elem = document.createElement("div");
      var size = Math.floor(Math.random() * 4 + 1);
      $(elem).addClass("star");
      $(elem).css({
        left: Math.floor(Math.random() * canvasWidth),
        top: Math.floor(Math.random() * canvasHeight),
        opacity: Math.random(),
        width: size,
        height: size
      });

      $canvas.append(elem);
    }
    var $star = $(".star");
    var stl = new TimelineMax({ yoyo: true });
    stl.add(
      TweenMax.staggerTo(
        $star.slice(1, maxStars / 10),
        0.5,
        {
          autoAlpha: 0,
          scale: 0,
          yoyo: true,
          repeat: -1,
          repeatDelay: 1,
          ease: Bounce.easeOut
        },
        0.15
      )
    );
  }

  /*
   * Animating the Shooting Star
   */
  function shootingStar() {
    var tl = new TimelineMax({}),
      //scale = (Math.random() * 1.2 + .5);
      scale = 1;
    TweenMax.set($streak, {
      left: canvasWidth / 2 + 140,
      top: 0,
      scale: 0
    });
    tl.fromTo(
      $streak,
      scale,
      {
        left: canvasWidth / 2 + 300,
        top: -150,
        scale: scale,
        autoAlpha: 1,
        ease: "slow"
      },
      {
        left: "-=750",
        top: "+=750",
        scale: 0,
        autoAlpha: 0,
        ease: "slow"
      }
    );

    return tl;
  }

  starField();
});

var fps = document.getElementById("fps"),
  startTime = Date.now(),
  frame = 0;

function tick() {
  var time = Date.now();
  frame++;
  if (time - startTime > 1000) {
    fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1) + " fps";
    startTime = time;
    frame = 0;
  }
  window.requestAnimationFrame(tick);
}
tick();