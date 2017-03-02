$(document).on("click", "#save-comment", function() {
  var commentId = $(this).attr("data-id"),
      comment = $(this).siblings("#new-comment").val().trim();    
  $(this).siblings(".comments").prepend("<section class='comment'><p id='" + commentId +
                   "' class=comment-text>" + comment +
                    "</p><button class='btn btn-sm btn-danger remove'>Remove</button></section>");
  $(this).siblings(".comments").css("display", "block");                     
  
  $.ajax({
    method: "POST",
    url: "/comment/" + commentId,
    data: {
      comment: comment
    }
  })
  .done(function(data) {
      $(this).siblings("#new-comment").val(""); 
      console.log("Sent: ", data);
  });
});

$(document).on("click", ".remove", function() {
  $(this).parent().remove();

  $.ajax({
    method: "DELETE",
    url: "/delete/" + $(this).siblings(".comment-text").attr("id")
  })
});



