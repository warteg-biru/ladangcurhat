/*---------------------------CLIENT SIDE SCRIPTS---------------------------*/
$(document).ready(function() {
    $('#contacts').DataTable( {
        "initComplete": function () {
            var api = this.api();
            api.$('td').click( function () {
                api.search( this.innerHTML ).draw();
            } );
        },
        "fnDrawCallback": function ( oSettings ) {
            $(oSettings.nTHead).hide();
            $(oSettings.nTFoot).hide();
        },
        "iDisplayLength": 15,
        "bLengthChange": false,
        "dom": '<"contact-search"f>t<"contact-page"p><"contact-info"i>',
        "language": {
            "info": "Showing _END_ of _TOTAL_ Contacts",
            "search": "",
            "zeroRecords": "Nothing found",
            "infoEmpty": "No contacts available"
        }
    } );
    $('#contacts_filter label input').attr("placeholder", "Search..");
    $('.dashboard').hide();
    $('#nextPage').hide();
} );

$('.btn-guest').click(function(){
    $('.login-canvas').hide();
    $('#nextPage').show();
});

var counter = 0;
$('#nextPage').click(function(){
    if(counter === 0){
    $('#nextPage').removeClass("arrow-to-right to-right");
    $('#nextPage').addClass("arrow-to-left to-left");
    goLeft();
    counter++;
    }
    else{
    $('#nextPage').addClass("arrow-to-right to-right");
    $('#nextPage').removeClass("arrow-to-left to-left");
    goRight();
    counter--;
    }
});

$(document).on('swipeleft', function(){
    if(counter === 0){
        goLeft();
        counter++;
    }
});

$(document).on('swiperight', function(){
    if(counter !== 0){
        goRight();
        counter--;
    }
});

function goLeft(){
    $('#mainContainer').addClass("move-left");
    $('.dashboard').show();
    setTimeout("$('.ladangcurhat-navbar').toggleClass('show-navbar');", 250);
    setTimeout("$('#messagesOutput').hide();", 200);
}

function goRight(){
    $('#mainContainer').removeClass("move-left");
    $('#messagesOutput').show();
    $('.ladangcurhat-navbar').toggleClass('show-navbar');
    setTimeout("$('.dashboard').hide();", 200);
}


/*---------------------------CLIENT SIDE CHAT SYSTEM---------------------------*/
$(function () {
    var socket = io();
    var clientID;
    var currClient = ""; 
    var userName = "";
    socket.on('connected', function(response) {
        clientID = response.clientID;
        console.log(clientID);
    });
    $('form').submit(function(){
        var str = $('#m').val();
        if (!(str.replace(/\s/g, '').length == 0)) {
        socket.emit('chat message', $('#m').val());
        }
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(data) {
        var msg = data.message;
        var clientName = data.clientName;
        if(userName == clientName){
        if(currClient != clientName){
            $('#messages').append('<li><span class="sender-name">' + clientName + '</span><br><span class="speech-bubble">' + msg + '</span></li>');
            currClient = clientName;
        }
        else{
            $('#messages').append('<li><span class="speech-bubble">' + msg + '</span></li>');
        } 
        }
        else{
        if(currClient != clientName){
            $('#messages').append('<li class="overflow-auto"><div class="overflow-auto float-right"><span class="sender-name float-right">' + clientName + '</span><br><span class="speech-bubble">' + msg + '</span></div></li>');
            currClient = clientName;
        }
        else{
            $('#messages').append('<li style="overflow: auto;"><div class="float-right"><span class="speech-bubble">' + msg + '</span></div></li>');
        }
        }
    });
    socket.on('nameResult', function(result) {
        if(userName == ""){
        userName = result.name;
        }
        $('#messages').append($('<li class="sender-name text-center">').text('Welcome ' + result.name));
    });
});