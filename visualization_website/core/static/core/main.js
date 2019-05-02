$(document).ready(function() {
    $("#select_columns").change(function(){
        const vals = $("#select_columns option:selected");

        const calc_select = $("#calc_column");
        calc_select.empty();

        if(vals.length === 0){

            let children = calc_select.parent().children();

            for(let i = 0; i < children.length; i++) {
                if(children[i].className === "text")
                {
                    children[i].textContent = "";
                    return;
                }
            }
        }

        $.each(vals, function(i, val){
            calc_select.append($('<option>', {
                value: val.value,
                text: val.text
            }));
        });
    });
    $('#image_stat').zoomify({

  // animation duration
  duration: 200,

  // easing effect
  easing:   'linear',

  // zoom scale
  // 1 = fullscreen
  scale:    0.9

});

});
