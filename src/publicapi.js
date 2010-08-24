/*********************************************************
 * The actual jQuery plugin and document ready handlers.
 ********************************************************/

//The publicy exposed method of jQuery.prototype, available (and meant to be
//called) on jQuery-wrapped HTML DOM elements.
$.fn.mathquill = function(cmd, latex)
{
  switch(cmd)
  {
  case 'html':
    return this.html().replace(/<span class="?cursor( blink)?"?><\/span>|<span class="?textarea"?><textarea><\/textarea><\/span>/ig, '');
  case 'latex':
    if(arguments.length > 1)
      return this.each(function()
      {
        var mathObj = $(this).data('[[mathquill internal data]]');
        if(mathObj && mathObj.block && mathObj.block.renderLatex)
          mathObj.block.renderLatex(latex);
      });
    var mathObj = this.data('[[mathquill internal data]]');
    if(mathObj && mathObj.block)
      return mathObj.block.latex();
    return;
  case 'revert':
    return this.each(function()
    {
      var mathObj = $(this).data('[[mathquill internal data]]');
      if(mathObj && mathObj.revert)
        mathObj.revert();
    });
  case 'redraw':
    return this.find(':not(:has(:first))').change().end();
  default:
    return createRoot.call(this, cmd);
  }
};

//on document ready, mathquill-ify all `<tag class="mathquill-*">latex</tag>`
//elements according to their CSS class.
$(function()
{
  $('.mathquill-embedded-latex').mathquill();
  $('.mathquill-editable').mathquill('editable');
  $('.mathquill-textbox').mathquill('textbox');
});
