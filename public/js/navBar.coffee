class @Index
  @logoSlideOut = 'icon-right-open-big'
  @logoSlideIn = 'icon-left-open-big'
  @slideOut = 'slide-out'
  @slideIn = 'slide-in'
  @logo = '.logo'
  @wrapper = '#wrap'
  @bookmark = '.navbar li a'
  @animationTime = 300

  @bindEvents: =>
    $(@bookmark).on('click', @animateTo)
    $(@logo).on('click', @toggleNavBar)
    $(window).on('resize', @fullscreenResize)

  @init: =>
    @bindEvents()

  @noNavigation: =>
    return $(@wrapper).css('content') == 'nonav' 

  @calculateTopDistance: (e) =>
    section = $(e).attr('href')
    offset = 0
    offset = $(section).offset().top if $(section).offset() 
    $(e).attr('data-top', offset)

  @fullscreenResize: =>
    $(@wrapper).removeClass(@slideIn) if @noNavigation()

  @bookmarkDistanceToTop: =>
    @calculateTopDistance(link) for link in $(@bookmark)
    @fullscreenResize()

  @toggleNavBar: (e) =>
    return if @noNavigation()
    e.preventDefault() if e?

    if $(@wrapper).hasClass(@slideIn) 
        #navigation is visible, slide in and hide it
        $(@wrapper).removeClass(@slideIn).addClass(@slideOut)
        $(@logo).removeClass(@logoSlideIn).addClass(@logoSlideOut)
        $(@wrapper).unbind('touchmove', false)
    else 
        #navigation is hidden, slide out and show it
        $(@wrapper).removeClass(@slideOut).addClass(@slideIn)
        $(@logo).removeClass(@logoSlideOut).addClass(@logoSlideIn)
        $(@wrapper).bind('touchmove', false);
        

  @animateTo: (e) =>
    e.preventDefault() if e?
    @bookmarkDistanceToTop()
    @toggleNavBar()
    $(@wrapper).attr('data-scrollto', $(e.currentTarget).attr('href') )
    timeout = @animationTime
    timeout = 0 if @noNavigation() 
    setTimeout (-> $('html, body').animate 'scrollTop': $(e.currentTarget).attr('data-top'), @animationTime ), timeout

  
$ -> 
    Index.init()


