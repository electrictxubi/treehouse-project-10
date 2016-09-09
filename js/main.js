var clickedOn = false;
var api = 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';
    var jsonFLIKR = "";
    var data = {
      format: "json"
    };
    function displayPhotos(data){
      jsonFLIKR = data;
      var photoHTML = "";
      $.each( data.items.slice(0,12), function(i,photo){
        photoHTML+='<img class="flikr lightbox_trigger picture" src="'+photo.media.m+'" id="'+  i +'" alt="'+ jsonFLIKR.items[i].title +'"></img>';
      });
      $('.photo-gallery').html(photoHTML);
    };
    $.getJSON(api, data, displayPhotos);



    function captionHTML(arrayCodeIn) {
      if(jsonFLIKR.items[arrayCodeIn].tags == ""){tags = 'none'} else {tags = jsonFLIKR.items[arrayCodeIn].tags};
      var answerCaption = '<span class="titleFlikr">Title: '+ jsonFLIKR.items[arrayCode].title +'</span><br>'+
      '<span class="linkToFlikr"><a href="'+jsonFLIKR.items[arrayCodeIn].link+'">Flikr Link</a></span><br>'+
      '<span class="authorFlikr">Author: '+ jsonFLIKR.items[arrayCodeIn].author +'</span><br>'+
      '<span class="tagsFlikr">Tags: '+ tags +'</span><br>' +
      '<span class="publishFlikr">Publish Date: '+ jsonFLIKR.items[arrayCodeIn].published +'</span>'
      return answerCaption;
    }
    var arrayCode = "";
    $(document).on("click",".lightbox_trigger", function() {
      var image_href = $(this).attr('src');
      image_code = '<li><img class="ready" src="' + image_href +'" /></li>';
      
      $.each(jsonFLIKR.items.slice(0,12),function(i, item){
        if(item.media.m==image_href){
          arrayCode=i;
        }
      });

      var tags = "";
    
      if ($('#lightbox').length > 0) { 
        
        $('.content').html(
          '<div id="lightbox">' +
          '<p><i class="fa fa-times fa-2x" aria-hidden="true"></i></p>' +
          '<div id="content">' +
            '<ul class="content">' +          
              image_code +
              '<li><i class="fa fa-angle-double-left fa-4x" id="prevLink" aria-hidden="true"></i></li>' + 
              '<li><i class="fa fa-angle-double-right fa-4x" id="nextLink" aria-hidden="true"></i></li>' +
            '</ul>' +
            '<div style="clear: both;"></div>' +
            '<div class="caption-box">'+ captionHTML(arrayCode) +'</div>'+
          '</div>' +  
        '</div>'
        )
        $('#lightbox').show();
      } else{
        var lightbox = 
        '<div id="lightbox">' +
          '<p><i class="fa fa-times fa-2x" aria-hidden="true"></i></p>' +
          '<div id="content">' +
            '<ul class="content">' +          
              image_code +
              '<li><i class="fa fa-angle-double-left fa-4x" id="prevLink" aria-hidden="true"></i></li>' + 
              '<li><i class="fa fa-angle-double-right fa-4x" id="nextLink" aria-hidden="true"></i></li>' +
            '</ul>' +
            '<div style="clear: both;"></div>' +
            '<div class="caption-box">'+ captionHTML(arrayCode) +'</div>'
          '</div>' +  
        '</div>';

        $('body').append(lightbox);
     } 
      $('.fa-times').click(function(){
        $('#lightbox').hide();
      })
  });
    function updateLightbox(thisPhoto){
      $('.content').html(
          '<div id="lightbox">' +
          '<p><i class="fa fa-times fa-2x" aria-hidden="true"></i></p>' +
          '<div id="content">' +
            '<ul class="content">' +          
              '<li><img class="ready" src="' + thisPhoto +'" /></li>' +
              '<li><i class="fa fa-angle-double-left fa-4x" id="prevLink" aria-hidden="true"></i></li>' + 
              '<li><i class="fa fa-angle-double-right fa-4x" id="nextLink" aria-hidden="true"></i></li>' +
            '</ul>' +
            '<div style="clear: both;"></div>' +
            '<div class="caption-box">'+ captionHTML(arrayCode) +'</div>'+
          '</div>' +  
        '</div>'
      ) 
      if(!clickedOn){
        $('.caption-box').last().hide();
      };
    }
    function nextT(){
      arrayCode++;
      if(arrayCode >=12) {
        arrayCode = 0;
      }
      updateLightbox(jsonFLIKR.items[arrayCode].media.m);
    }
    function prevT(){
      arrayCode--;
      if(arrayCode <= -1) {
        arrayCode = 11;
      }
      updateLightbox(jsonFLIKR.items[arrayCode].media.m);
    }
    $(document).on('click', '#nextLink', nextT);
    $(document).on('click', '#prevLink', prevT);

    var jsonWIKI = "";
    var data2 = {
      action: "opensearch",
      format: "json",
      search: "magick"
    };
    function displayWikiTitles(data){
      jsonWIKI = data;
      var wikiHTML = "";
      $.each( data[1], function(i,wiki){
        wikiHTML+='<div class="lightbox_trigger2 picture wikil" id="'+ (i + 20) +'">'+data[1][i]+'</div>';
        
      });
      $('.wiki-gallery').html(wikiHTML);
    };
    $.getJSON('https://en.wikipedia.org/w/api.php?callback=?', data2, displayWikiTitles);

    function captionHTML2(arrayCodeIn) {
      var answerCaption = '<span class="titleFlikr">Title: '+ jsonWIKI[1][arrayCodeIn] +'</span><br>'+
      '<span class="linkToFlikr"><a href="'+jsonWIKI[3][arrayCodeIn]+'">Wikipedia Link</a></span><br>'+
      '<span class="summaryWiki">Summary: '+ jsonWIKI[2][arrayCodeIn] +'</span><br>'
      return answerCaption;
    }
    var arrayCode2 = "";
    $(document).on("click",".lightbox_trigger2", function() {
      var thisTitle = $(this).html();
      $.each(jsonWIKI[1],function(i, item){
        if(item==thisTitle){
          arrayCode2=i;
        }
      });
    
      if ($('#lightbox').length > 0) { 
        
        $('.content').html(
          '<div id="lightbox">' +
          '<p><i class="fa fa-times fa-2x" aria-hidden="true"></i></p>' +
          '<div id="content">' +
            '<ul class="content">' +          
              '<li><div class="caption-box2">'+ captionHTML2(arrayCode2) +'</div></li>'+
              '<li><i class="fa fa-angle-double-left fa-4x" id="prevLink2" aria-hidden="true"></i></li>' + 
              '<li><i class="fa fa-angle-double-right fa-4x" id="nextLink2" aria-hidden="true"></i></li>' +
            '</ul>' +
            '<div style="clear: both;"></div>' +
          '</div>' +  
        '</div>'
        )
        $('#lightbox').show();
      } else{
        var lightbox = 
        '<div id="lightbox">' +
          '<p><i class="fa fa-times fa-2x" aria-hidden="true"></i></p>' +
          '<div id="content">' +
            '<ul class="content">' +          
              '<li><div class="caption-box2">'+ captionHTML2(arrayCode2) +'</div></li>'+
              '<li><i class="fa fa-angle-double-left fa-4x" id="prevLink2" aria-hidden="true"></i></li>' + 
              '<li><i class="fa fa-angle-double-right fa-4x" id="nextLink2" aria-hidden="true"></i></li>' +
            '</ul>' +
            '<div style="clear: both;"></div>' +
          '</div>' +  
        '</div>';

        $('body').append(lightbox);
     } 
      $('.fa-times').click(function(){
        $('#lightbox').hide();
      })
  });
    function updateLightbox2(){
      $('.content').html(
          '<div id="lightbox">' +
          '<p><i class="fa fa-times fa-2x" aria-hidden="true"></i></p>' +
          '<div id="content">' +
            '<ul class="content">' +          
              '<li><div class="caption-box2">'+ captionHTML2(arrayCode2) +'</div></li>'+
              '<li><i class="fa fa-angle-double-left fa-4x" id="prevLink2" aria-hidden="true"></i></li>' + 
              '<li><i class="fa fa-angle-double-right fa-4x" id="nextLink2" aria-hidden="true"></i></li>' +
            '</ul>' +
            '<div style="clear: both;"></div>' +
          '</div>' +  
        '</div>'
      ) 
      // $('.caption-box2').last().hide();
    }
    function nextT2(){
      clickedOn = true;
      arrayCode2++;
      if(arrayCode2 >=10) {
        arrayCode2 = 0;
      }
      updateLightbox2();
    }
    function prevT2(){
      clickedOn = true;
      arrayCode2--;
      if(arrayCode2 <= -1) {
        arrayCode2 = 9;
      }
      updateLightbox2();
    }
    $(document).on('click', '#nextLink2', nextT2);
    $(document).on('click', '#prevLink2', prevT2);

   $("#flikrOPTIONS").change(function(){
    if($('#flikrOPTIONS').val() == '1'){
       var sortArrayTitle = [];
       $('.flikr').each(function(){
          sortArrayTitle.push($(this).attr('alt'));
       });
       sortArrayTitle.sort();
       $('.flikr').addClass('old1')
       $('.flikr').each(function(){
          var needToShow = sortArrayTitle.pop();
          $.each(jsonFLIKR.items.slice(0,12), function(i, photo){
            if(photo.title == needToShow){
              var photo1HTML ='<img class="flikr lightbox_trigger picture" src="'+photo.media.m+'" id="'+  i +'" alt="'+ photo.title +'"></img>';
              $('.photo-gallery').append(photo1HTML);
            }
          });
       });
       $('.old1').remove();
     }

     if($('#flikrOPTIONS').val() == '2'){
       var sortArrayAuthor = [];
       $('.flikr').each(function(){
          sortArrayAuthor.push(jsonFLIKR.items[$(this).attr('id')].author);
       });
       sortArrayAuthor.sort();
       $('.flikr').addClass('old2');
       $('.flikr').each(function(){
          var needToShow = sortArrayAuthor.pop();
          $.each(jsonFLIKR.items.slice(0,12), function(i, photo){
            if(photo.author == needToShow){
              var photo2HTML ='<img class="flikr lightbox_trigger picture" src="'+photo.media.m+'" id="'+  i +'" alt="'+ photo.title +'"></img>';
              $('.photo-gallery').append(photo2HTML);
            }
          });
       });
       $('.old2').remove();
     }

      if($('#flikrOPTIONS').val() == '0'){
        $('.flikr').addClass("old3");
          $.each(jsonFLIKR.items.slice(0,12), function(i, photo){
              var photo2HTML ='<img class="flikr lightbox_trigger picture" src="'+photo.media.m+'" id="'+  i +'" alt="'+ photo.title +'"></img>';
              $('.photo-gallery').append(photo2HTML);
           
       });
       $('.old3').remove();
     }
  });

   $("#wikiOPTIONS").change(function(){
    if($('#wikiOPTIONS').val() == '1'){
       var sortArrayTitleW = [];
       $('.wikil').each(function(){
          sortArrayTitleW.push($(this).html());
       });
       sortArrayTitleW.sort();
       $('.wikil').addClass('old1w')
       $('.wikil').each(function(){
          var needToShowW = sortArrayTitleW.pop();
          $.each(jsonWIKI[1], function(i, photo){
            if(jsonWIKI[1][i] == needToShowW){
              var wiki1HTMLW ='<div class="lightbox_trigger2 picture wikil" id="'+ (i + 20) +'">'+jsonWIKI[1][i]+'</div>';
              $('.wiki-gallery').append(wiki1HTMLW);
            }
          });
       });
       $('.old1w').remove();
     }

     if($('#wikiOPTIONS').val() == '2'){
       var sortArraySumW = [];
       $('.wikil').each(function(){
          sortArraySumW.push(jsonWIKI[2][($(this).attr('id')-20)]);
       });
       sortArraySumW.sort();
       $('.wikil').addClass('old2');
       $('.wikil').each(function(){
          var needToShowW2 = sortArraySumW.pop();
          $.each(jsonWIKI[2], function(i, photo){
            if(jsonWIKI[2][i] == needToShowW2){
              var wiki2HTMLW ='<div class="lightbox_trigger2 picture wikil" id="'+ (i + 20) +'">'+jsonWIKI[1][i]+'</div>';
              $('.wiki-gallery').append(wiki2HTMLW);
            }
          });
       });
       $('.old2').remove();
     }

      if($('#wikiOPTIONS').val() == '0'){
        $('.wikil').addClass("old3");
          $.each(jsonWIKI[1], function(i, photo){
              var wiki3HTMLW ='<div class="lightbox_trigger picture wikil" id="'+  (i + 20) +'">'+jsonWIKI[1][i]+'</div>';
              $('.wiki-gallery').append(wiki3HTMLW);
           
       });
       $('.old3').remove();
     }
  });