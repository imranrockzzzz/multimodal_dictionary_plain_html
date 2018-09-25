var globalData;
var tempData;
$(document).ready(function(){
    // function to close our popups

    var word = localStorage.getItem('word')
    var synonym = localStorage.getItem('synonym')
    var meaning = localStorage.getItem('meaning')
    var example = localStorage.getItem('example')
    var videoUrl = localStorage.getItem('videoUrl')
    var imgUrl = localStorage.getItem('imgUrl')
    var gifUrl = localStorage.getItem('gifUrl')

    var storage = firebase.storage();
    var storageRef = storage.ref();
    var tangImgRef = storageRef.child('Picture/'+word +'.png');
    var tangGifRef = storageRef.child('Gif/'+word +'.gif');

    $('#lblWord').text(word);
    $('#lblSynonym').text(synonym);
    $('#lblMeaning').text(meaning);
    $('#lblExample').text(example);
    $('#lblYoutubeLink').attr('src',videoUrl);

    $('.imgSrc').attr('src','img/no_image.png')
    tangImgRef.getDownloadURL().then(function(value,error) {
        $('.imgSrc').attr('src',value)
    });

    $('.gifSrc').attr('src','img/no_gif.png')
    tangGifRef.getDownloadURL().then(function(value) {
        $('.gifSrc').attr('src',value)
    });
   
    $('.btn-back').click(function(){
        window.location.href = 'index.html';
    });
});
