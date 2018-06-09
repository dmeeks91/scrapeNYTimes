const article = {
  save: (btn) => {
      $.ajax({
        method: "PUT",
        url: "/api/save",
        data: {id: btn.target.id}
      }).then(function(data) {
        if (data.ok) location.reload();
      });
  },
  scrape: () => {
    $.getJSON("/api/scrape").then(function(data) {     
      toastr[data.type](data.message);
      if (data.type === "success")
      {
        setTimeout(() => location.reload(),1500);
      } 
    });
  }
}

$(document).ready(function() {
    $(document).on("click", ".btn.save", (e) => article.save(e));
    $(document).on("click", ".scrape-new", () => article.scrape());

    function renderEmpty() {
      // This function renders some HTML to the page explaining we don't have any articles to view
      // Using a joined array of HTML string data because it's easier to read/change than a concatenated string
      var emptyAlert = $(
        [
          "<div class='alert alert-warning text-center'>",
          "<h4>Uh Oh. Looks like we don't have any new articles.</h4>",
          "</div>",
          "<div class='panel panel-default'>",
          "<div class='panel-heading text-center'>",
          "<h3>What Would You Like To Do?</h3>",
          "</div>",
          "<div class='panel-body text-center'>",
          "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
          "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
          "</div>",
          "</div>"
        ].join("")
      );
      // Appending this data to the page
      articleContainer.append(emptyAlert);
    }
  
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": true,
      "progressBar": false,
      "positionClass": "toast-top-full-width",
      "preventDuplicates": true,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
  });
  