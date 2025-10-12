// Slicebox gallery logic for art page
// credit to https://tympanus.net/Development/Slicebox/index.html
$(function() {
    const Page = (function() {
        const $navArrows = $( '#nav-arrows' ).hide(),
            $shadow = $( '#shadow' ).hide(),
            slicebox = $( '#sb-slider' ).slicebox( {
            onReady : function() {
                    $navArrows.show();
                    $shadow.show();
                },
                orientation : 'r',
                cuboidsRandom : true,
                disperseFactor : 30
                } ),
                init = function() {
                    initEvents();
                },
                initEvents = function() {
                // add navigation events
                $navArrows.children( ':first' ).on( 'click', function() {
                    slicebox.next();
                    return false;
                } );
                $navArrows.children( ':last' ).on( 'click', function() {
                    slicebox.previous();
                    return false;
                } );
            };
        return { init : init };
    })();
    Page.init();
});
