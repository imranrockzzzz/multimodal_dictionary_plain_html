var globalData;
var tempData;
$(document).ready(function(){
    getData();    
    $('.main-content').show();
    $('.main-content-box').hide();
    // function to close our popups
    function closePopup(){
        $('.overlay-bg, .overlay-content').hide();
    }
    $('.show-popup').click(function(event){
        event.preventDefault();
        showPopup();
    });
    $('.close-btn, .overlay-bg').click(function(){
        closePopup();
    });
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            closePopup();
        }
    });

    $('.btn-back').click(function(){
        $('body').css('overflow','hidden');
        $('.main-content').show();
        $('.main-content-box').hide();
    });

    $('.inputSearch').keyup(function(e) {
        if(e.keyCode != 8){
            var value = $(this).val();
            getSearch(value)
        }
    });

    $('table').on('click','.show-popup',function(){
        var word = $(this).children().text().trim();
        var index = $(this).attr('index');
        var filteredData = tempData.filter(function(v,i){
            if(index == i){
                return v;
            }
        })
        if(filteredData.length > 0){
            var data = filteredData[0];
            var url = data.video;
            if(url != ""){
                let splittedUrl = url.split('watch?v=');
                let newUrl = splittedUrl.join('embed/');
                newUrl = newUrl.split('&')[0];
                url = newUrl;
            }            
        }
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var tangImgRef = storageRef.child('Picture/'+data.word +'.png');
        var tangGifRef = storageRef.child('Gif/'+data.word +'.gif');
        localStorage.setItem('word', data.word);
        localStorage.setItem('synonym', data.synonym);
        localStorage.setItem('meaning', data.meaning);
        localStorage.setItem('example', data.example);
        localStorage.setItem('videoUrl', url);
        localStorage.setItem('imgUrl', tangImgRef);
        localStorage.setItem('gifUrl', tangGifRef);
       
        window.location.href = 'detail.html';        
    })
});

function getData(){
    $.ajax({
        url:"json/week_14.json",
        dataType:"text",
        success:function(data) { 
            var csvData = JSON.parse(data);
            globalData = csvData;
            tempData = csvData;
            var html = '';
            $.each(csvData,function(i,v){
                html += '<tr class="show-popup" index='+i+'>'+
                            '<td>'+v.word+'</td>'+
                        '</tr>';
            })
            $('table tbody').html(html);
        }
    });
    let windowHeight = window.innerHeight;
            windowHeight -= 100;
    document.querySelector('.table').style.height = windowHeight + 'px';
}

function csvJSON(csv){
    var lines=csv.split("\n");
    var result = [];
    var headers= ['Word','Synonym','Meaning','Example','YoutubeLink']
    for(var i=0;i<lines.length;i++){
      var obj = {};
      var currentline=lines[i].split(";");
      for(var j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    //let jsonData = JSON.stringify(result); //JSON
    console.log(result);
    return result;
}

function showPopup(){
    var docHeight = $(document).height();
    var scrollTop = $(window).scrollTop();
    $('.overlay-bg').show().css({'height' : docHeight});
    $('.popup').show().css({'top': scrollTop+20+'px'});
}

function getSearch(value){
    var filteredData = globalData.filter(function(val){
      value = value.toLocaleLowerCase();
      val = val.word.toLocaleLowerCase();
      var match = val.indexOf(value);
      if(match > -1){
        return val;
      }
      console.log(value)
    })
    var html = '';
    tempData = filteredData;
    $.each(filteredData,function(i,v){
        html += '<tr class="show-popup" index='+i+'>'+
                    '<td>'+v.word+'</td>'+
                '</tr>';
    })
    $('table tbody').html(html);
}