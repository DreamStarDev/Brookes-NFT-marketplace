(function(){
  // We look for:
  //  A `script` element
  //  With a `data-id` attribute
  //  And a `data-name` attribute equal to "MyUniqueName"
  var me = document.querySelector('script[data-id]');
  var id = me.getAttribute('data-id');
  console.log(id)
})();