function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
function getDelay(ind) {
  return (ind + 1) * 100;
}

$(function() {
  // ready start
  if ($(window).width() >= 570) {
    var serv = $(".anim");

    // TweenMax.set(".anim", { y: "+=300" });
    var servTL = new TimelineMax();
    var sleep = 0.1;
    var duration = 0.5;
    var controller = new ScrollMagic.Controller();

    // servTL
    //   .add(TweenMax.to(".anim-1", 0.6, { y: 0, ease: Linear.easeNone }), 0)
    //   .add(TweenMax.to(".anim-2", 0.6, { y: 0, ease: Linear.easeNone }), 0.5);
    $(".anim").each(function(index, element) {
      // element == this
      var servScene = new ScrollMagic.Scene({
        triggerElement: element,
        offset: -100,
        // duration: 400
        triggerHook: "onEnter"
      })
        .setClassToggle(this, "moveup")
        // .setTween(servTL)
        .addTo(controller);
    });
  } else {
    $(".anim").addClass("moveup");
  }

  // ready end
});
