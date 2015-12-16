javascript:(function(){


/*checks if already exists; if so deletes and begins again*/
if(document.getElementById('antigab_display')){
document.body.removeChild(document.getElementById('antigab_display'));
}

var displayframe = document.createElement('iframe');
displayframe.setAttribute('id','antigab_frame');

var displaydiv = document.createElement('div');

displaydiv.setAttribute('id','antigab_display');
displaydiv.style.width = "100%";
displaydiv.style.height = "130px";
displaydiv.style.position = "fixed";
displaydiv.style.zIndex = "90000000";
displaydiv.style.top = "0";
displaydiv.style.left = "0";
displaydiv.style.background="#DCEEFF";
displaydiv.style.borderBottom="10px solid #fff";
displaydiv.style.borderLeft="5px solid #CBDDEE";
displaydiv.style.fontSize="15px";
displaydiv.style.color="#000";
displaydiv.style.textAlign="left";
displaydiv.style.overflow="auto";
displaydiv.style.fontFamily="Arial,Helvetica,sans-serif";
displaydiv.style.fontStyle="normal";
displaydiv.style.fontWeight="normal";
displaydiv.style.lineHeight="line-height:1.3em";

var stylesheet = "<link href=\'http://fonts.googleapis.com/css?family=Corben:700\' rel=\'stylesheet\' type=\'text/css\'>";
stylesheet += '<style type="text/css">';

stylesheet += "#antigab_display_box{float:left;width:100%;height:130px;}";
stylesheet += "#antigab_title_box{ border-top:solid 5px #CBDDEE;float:left;height:125px;width:14.5%;display:inline;background:#CBDDEE;padding-left:.5%;}"; 
stylesheet += "#antigab_title{line-height:1.3em;font-size:18px;font-weight:bold;color:#000;font-family: \'Corben\', cursive;}";
stylesheet += "#antigab_desc{float:left;width:90%;margin-bottom:5px;font-size:12px;line-height:1.3em;}";
stylesheet += "#antigab_remove{height:auto;font-family:Arial,Helvetica,sans-serif;font:Arial,Helvetica,sans-serif;float:left;color:#fff;font-size:.8em;vertical-align:bottom;margin:0;padding:2px 4px;display: inline-block;border: 2px outset ButtonFace;background:#358;cursor: default;border-radius:10px;text-transform:none;letter-spacing:normal;}";
stylesheet += "#antigab_remove:active{border-style:inset;-webkit-appearance:push-button;}"; 

stylesheet += "#antigab_about{height:auto;font-family:Arial,Helvetica,sans-serif;font:Arial,Helvetica,sans-serif;float:left;color:#fff;font-size:.8em;vertical-align:bottom;margin:0;padding:2px 4px;display: inline-block;border: 2px outset ButtonFace;background:#358;cursor: default;border-radius:10px;text-transform:none;letter-spacing:normal;margin-left:5px;}";
stylesheet += "#antigab_about:active{border-style:inset;-webkit-appearance:push-button;}";

stylesheet += "#antigab_output_box{background:transparent;float:left;display:inline;width:83%;height:118px;padding:3px 1%;font-size:12px;overflow:auto;border-top:3px solid #CBDDEE;border-bottom:3px solid #CBDDEE; }";
stylesheet += "#antigab_output_sentences{float:left;display:inline;width:50%;height:118px;font-size:14px;font-family:Arial,Helvetica,sans-serif;}";
stylesheet += "#antigab_output_sen_title{line-height:1em;float:left;display:block;width:100%;height:20px;font-weight:bold;color:#358; }";
stylesheet += "#antigab_output_sen_list{line-height:1.4em;margin:0;padding:0 0 0 4%;list-style-type:decimal;list-style:decimal;}";
stylesheet += ".antigab_output_sen_item{overflow:none;postition:relative;font-family:Arial,Helvetica,sans-serif;font-weight:bold;list-style-type:decimal;list-style:decimal;margin:0 0 5px 20px;line-height:1.3em;color:#000;font-size:14px;background:none;padding:0;font-family:Arial,Helvetica,sans-serif;display:list-item;}";
stylesheet += ".antigab_nobold{font-weight:normal;color:#000;}";
stylesheet += ".antigab_output_sen_ctrl{overflow:auto;position:absolute;width:39.5%;height:80%;margin-top:18px;margin-left:-1em;}";


stylesheet += "#antigab_output_nodata{float:left;margin-bottom:5px;line-height:1.3em; }";

stylesheet += "#antigab_output_words{float:left;display:inline;width:32.5%;height:118px;font-size:12px;padding-left:5%;}";
stylesheet += "#antigab_output_wo_title{line-height:1em;float:left;display:block;width:100%;height:20px;font-weight:bold;color:#558;font-size:14px;color:#358; }";
stylesheet += "#antigab_output_wo_list{float:left;list-style-type: disc;margin:0;padding-left:4%; }";
stylesheet += ".antigab_output_wo_item{background:none;padding:0;font-size:12px;color:#000;list-style:disc;font-family:Arial,Helvetica,sans-serif;line-height: 1.3em;margin:0; }";

stylesheet += "#antigab_prev_sen{float:left;width:5%;height:100%;margin-right:1%;}";
stylesheet += "#antigab_prev_sen input{margin:0;border-radius:3px;color:#fff;float:left;width:100%;height:100%;font-weight:bold;font-size:1.8em;background:#baccdd;border:none;}";
stylesheet += "#antigab_prev_sen input:active{background:#a9bbcc;}";
stylesheet += "#antigab_next_sen{float:left;width:5%;height:100%;}";
stylesheet += "#antigab_next_sen input{margin:0;border-radius:3px;color:#fff;float:left;width:100%;height:100%;font-weight:bold;font-size:1.8em;background:#baccdd;border:none;}";
stylesheet += "#antigab_next_sen input:active{background:#a9bbcc;}";

stylesheet += "</style>";

var titlehtml = '<div id="antigab_title_box"><div id="antigab_title">Antigab</div>';
var titledesc = '<div id="antigab_desc">Use this bookmarklet to get a simple summary of the contents on any page.</div>';
var removebutton = '<input type="button" value="close" id="antigab_remove" onclick="javascript:document.body.removeChild(document.getElementById(\'antigab_display\'))">';
var aboutbutton = '<input type="button" value="about" id="antigab_about" onclick="window.open(\'http://davebunten.com/projects/antigab\');"></div>';

var begin = false;
var p_flag = false;
var h_flag = false;

var remove_words = ["Share this page","an","and","as","        ","youre","going","im","get","got","okay","thats","tell","having","then","cant","theyre","theres","","president","very","him","her","why","if","IF","want","any","really","take","ive","although","a","something","mr","mrs","ms","&#160;","able","lots","better","&nbsp;"," ","done","none","look","end","some","stick","recent","types","here","you","your","thy","shall","must","tis","make","much","nor","do","am","us","leave","came","  ","   ","--","---","on","the","to","that","by","in","he","has","and","for","is","a","of","his","an","it","its","it's","its'","as","can","who","over","from","mr","mrs","ms","with","or","both","were","would","have","like","said","about","not","was","I","me","what","will","be","when","are","out","all","at","more","than","those","had","been","says","such","since","into","least","before","ties","after","might","figure","she","estimated","week","we","still","but","doing","office","so","need","asked","while","part","no","set","took","including","parts","because","begun","they","just","only","say","this","up","could","don't","also","other","state","where","ever","big","give","too","near","let","even","many","little","plan","rest","made","last","through","whether","there","nations","their","toward","them","good","now","heavy","city","around","use","staff","chief","report","known","during","dont","nations","most","year","active","which","our","my","her","did","its","may","time","how","person","see","...","..","ampersand","&lsquo;","&rsquo;","&sbquo;","&ldquo;","&rdquo;","&bdquo;","&dagger;","&Dagger;","&permil;","&lsaquo;","&rsaquo;","&spades;","&clubs;","&hearts;","&diams;","&oline;","&larr;","&uarr;","&rarr;","&darr;","&trade;"];


function hasClass(element, cls) {
    var r = new RegExp('\\b' + cls + '\\b');
    return r.test(element.className);
}

var paragraphs_temp = document.getElementsByTagName('p');
var paragraphs = [];

var remove_paragraph_classes = ["comment-footer","storydate","poweredByPostRank","ad","filed","posted","post-info","bottom-left","post_tags","byline","cmt_ops","seemore-wpw","wpw-sponsor","wpw-type","wpw-teaser","by","blq-hide","blq-disclaim","blq-footer-image-dark","disclaimer","blq-no-images","caption","bbc-st-basic","popular","element1","loggedIn","loggedOut","general","refer","summary"];

var remove_paragraph_contains = ['<a target="_blank" href="http://twitter.com/','<a name="share"></a>','by\n<a href="/user/','<a class="permalink"','<div class="storynav_next">','Sharing this page','Please enter the email address','<a href="http://www.thomsonreuters.com">Thomson Reuters</a>','Comments our editors','Click the button below','Your e-mail is used','CNET Blog Network','On your next visit','You are now logged in','Default comment.','<span id="dna-comment-count','Share this page','<span class="blq-home">'];

for(var i = 0; i < paragraphs_temp.length; i++){

	var temp_sentence = String(paragraphs_temp[i].innerHTML);
	var flag_class_found = false;
	var flag_contains_found = false;

	for(var b = 0; b < remove_paragraph_classes.length; b++){
		if(hasClass(paragraphs_temp[i], remove_paragraph_classes[b])){
			flag_class_found = true;
			break;
		}
	}

	for(var b = 0; b < remove_paragraph_contains.length; b++){
                if(~temp_sentence.indexOf(remove_paragraph_contains[b])){
                        flag_contains_found = true;
                        break;
                }
        }

	if(!flag_class_found && !flag_contains_found){
		paragraphs.push(paragraphs_temp[i]);
	}
}


var antigab_raw = "";
var sentences = [];
var words = [];
var unique_words = [];
var unique_words_count = [];
var cap_words = [];
var cap_unique_words = [];
var cap_unique_words_count = [];
var sentence_scores = [];

var antigab_output = "";

/*for finding unique words*/
function find_uniques(word_array){
	var unique_word_array = [];
	word_array = word_array.sort();
	for(var i = 0; i < word_array.length; i++){
		if(unique_word_array.indexOf(word_array[i]) == -1){
			unique_word_array.push(word_array[i]);
		}
	}
	return unique_word_array;
}

/*determines unique word occurence in word list*/
function find_uniques_count(word_array, unique_word_array){
	var unique_word_count_array = [];
	for(var i = 0; i < unique_word_array.length; i++){
		var count = 0;
			for(var x = 0; x < word_array.length;x++){
				if(unique_word_array[i] == word_array[x]){
					count++;
				}
			}
		unique_word_count_array.push([unique_word_array[i], count]);
	}
	return unique_word_count_array;
}

/*for scoring sentences based on word contents*/
function sentence_scoring(word_count_array, cap_word_count_array, sentence_array){
	var sentence_score_array = [];
	for(var i = 0; i < sentence_array.length; i++){
		var score = 0;
		var sentence_words = sentence_array[i].split(" ");
		for(var x = 0; x < word_count_array.length; x++){
			for(var b = 0; b < sentence_words.length; b++){
				if(word_count_array[x][0] == sentence_words[b]){
					score += word_count_array[x][1];
				}
			}
		}
		for(var z = 0; z < cap_word_count_array.length; z++){
			for(var b = 0; b < sentence_words.length; b++){
				if(cap_word_count_array[z][0] == sentence_words[b]){
					score += word_count_array[z][1];
				}
			}
		}
		sentence_score_array.push([sentence_array[i], score]);
	}
	return sentence_score_array;
}

/*sorts 2d array by 2nd element*/
function sort_2d(a,b){  
    return ((a[1] < b[1]) ? -1 : ((a[1] > b[1]) ? 1 : 0));
}

function remove_selected(used_array, delete_value){
	var new_array = [];
	for(var i = 0; i < used_array.length; i++){
		if(used_array[i] != delete_value){
			new_array.push(used_array[i]);
		}else{
			continue;
		}
	}
	return new_array;
}

var return_periods_array = [
new RegExp("Mr ", "g"),"Mr. ",
new RegExp("Ms ","g"),"Ms. ",
new RegExp("Mrs ","g"),"Mrs. ",
new RegExp("Sr ","g"),"Sr. ",
new RegExp("Mr ","g"),"Mr. ",
new RegExp("Dr ","g"),"Dr. ",
new RegExp("Jan ","g"),"Jan. ",
new RegExp("Feb ","g"),"Feb. ",
new RegExp("Mar ","g"),"Mar. ",
new RegExp("Apr ","g"),"Apr. ",
new RegExp("Jun ","g"),"Jun. ",
new RegExp("Jul ","g"),"Jul. ",
new RegExp("Aug ","g"),"Aug. ",
new RegExp("Sep ","g"),"Sep. ",
new RegExp("Oct ","g"),"Oct. ",
new RegExp("Nov ","g"),"Nov. ",
new RegExp("Dec ","g"),"Dec. ",
new RegExp("US ","g"), "U.S. ",
new RegExp("USA ","g"), "U.S.A. "
];

function return_periods(selected_string){
	var s = selected_string;
	for(var i = 0; i < return_periods_array.length; i += 2){
		s = s.replace(return_periods_array[i], return_periods_array[i+1]);
	}
	return s;
}

var remove_periods_array = [
new RegExp("Mr.","g"),"Mr",
new RegExp("Ms.","g"),"Ms",
new RegExp("Mrs.","g"),"Mrs",
new RegExp("Sr.","g"),"Sr",
new RegExp("Mr.","g"),"Mr",
new RegExp("Dr.","g"),"Dr",
new RegExp("Jan.","g"),"Jan",
new RegExp("Feb.","g"), "Feb",
new RegExp("Mar.","g"), "Mar",
new RegExp("Apr.","g"), "Apr",
new RegExp("Jun.","g"), "Jun",
new RegExp("Jul.","g"), "Jul",
new RegExp("Aug.","g"), "Aug",
new RegExp("Sep.","g"), "Sep",
new RegExp("Oct.","g"), "Oct",
new RegExp("Nov.","g"), "Nov",
new RegExp("Dec.","g"), "Dec",
new RegExp("U.S.","g"), "US",
new RegExp("U.S.A.","g"), "USA",
new RegExp("<br[^>]*>","g"), " ",
new RegExp("((<[\\s\\/]*script\\b[^>]*>)([^>]*)(<\\/script>))","gi"), "",
new RegExp("<\\/?[a-z][a-z0-9]*[^<>]*>","ig"), "",
new RegExp("&nbsp;","g"), " ",
new RegExp("\\s{2,}","g"), ' ',
new RegExp(" +(?= )","g"),' ',
new RegExp("(\\r\\n|\\n|\\r)","gm")," "
];

function remove_periods(p){
	for(var i = 0; i < remove_periods_array.length; i += 2){
		p = p.replace(remove_periods_array[i], remove_periods_array[i+1]);
        }
	if(p.substr(p.length-1) != "."){p += ".";}
	return p;
}

function get_selected_text(){
	var txt = '';
	if (window.getSelection){
		txt = window.getSelection();
	}else if (document.getSelection){
		txt = document.getSelection();
	}else if (document.selection){
		txt = document.selection.createRange().text;
	}else{
		return;
	}
return txt;
}

if(get_selected_text() != ""){
begin = true;
p_flag = false;
}else if(paragraphs.length > 0){
begin = true;
p_flag = true;
}

if(begin){
if(p_flag){
for(var i = 0; i < paragraphs.length-1; i++){
var p = paragraphs[i].innerHTML;
p = remove_periods(p);
antigab_raw += " " + String(p);
}
}else{
antigab_raw = remove_periods(String(get_selected_text()));
}

/*for sentence and word arrays*/
sentences = antigab_raw.toString().split(". ");
for(var i = 0; i < sentences.length; i++){
	sentences[i] = sentences[i] + ".";
}

/*remove questions*/
for(var i = 0; i < sentences.length; i++){
	if(~sentences[i].indexOf('? ')){
		var temp_sentences_array = sentences[i].split("? ");
		for(var b = 0; b < temp_sentences_array.length-1; b++){
			sentences = remove_selected(sentences, sentences[i]);
			sentences.push(temp_sentences_array[temp_sentences_array.length-1]);	
		}
	}
}

for(var i = 0; i < sentences.length; i++){
	if(~sentences[i].indexOf('! ')){
		var new_sentences = sentences[i].split('! ');
		sentences = remove_selected(sentences, sentences[i]);
		for(var x = 0; x < new_sentences.length; x++){
			if(x == new_sentences.length-1){
				sentences.push(new_sentences[x]);
			}else{
				sentences.push(new_sentences[x] + "!");
			}
                }	
	}
}

/*for dealing with quoted stuff*/
for(var i = 0; i < sentences.length; i++){
	var sentence = sentences[i];
	if(~sentence.indexOf('." ')){
		var new_sentences = sentence.split('." ');
		sentences = remove_selected(sentences, sentences[i]);
		for(var x = 0; x < new_sentences.length; x++){
			sentences.push('"' +new_sentences[x] + '."');
		}
	}
}

words = antigab_raw.toString().split(" ");

/*removes non-alpha characters from word elements*/
for(var i = 0; i < words.length; i++){
words[i] = words[i].replace(/[^a-zA-Z ]+/g,'');
}

/*removes needless words*/
for(var x = 0; x < remove_words.length; x++){
var cap_version = remove_words[x].charAt(0).toUpperCase() + remove_words[x].slice(1);
words = remove_selected(words, remove_words[x]);
words = remove_selected(words, cap_version);
}


/*for capitalized words*/
for(var i = 0; i < words.length-1; i++){
	if(words[i] == (words[i].charAt(0).toUpperCase() + words[i].substr(1))){
		cap_words.push(words[i]);
	}
}

unique_words = find_uniques(words);
unique_words_count = find_uniques_count(words, unique_words);
cap_unique_words = find_uniques(cap_words);
cap_unique_words_count = find_uniques_count(cap_words, unique_words);


sentence_scores = sentence_scoring(unique_words_count, cap_unique_words_count, sentences);

unique_words_count = unique_words_count.sort(sort_2d);
cap_unique_words_count = cap_unique_words_count.sort(sort_2d);
sentence_scores = sentence_scores.sort(sort_2d);

}



var next_script = "javascript:var current = document.getElementById('antigab_current_sentence').value;if(parseInt(current) != 5){document.getElementById('antigab_sen_' + current).style.visibility = 'hidden';document.getElementById('antigab_sen_' + String(parseInt(current)+1)).style.visibility = 'visible';document.getElementById('antigab_current_sentence').value = String(parseInt(current)+1);}else{document.getElementById('antigab_sen_' + current).style.visibility = 'hidden';document.getElementById('antigab_sen_1').style.visibility = 'visible';document.getElementById('antigab_current_sentence').value = '1';}";

var prev_script = "javascript:var current = document.getElementById('antigab_current_sentence').value;if(parseInt(current) != 1){document.getElementById('antigab_sen_' + current).style.visibility = 'hidden';document.getElementById('antigab_sen_' + String(parseInt(current)-1)).style.visibility = 'visible';document.getElementById('antigab_current_sentence').value = String(parseInt(current)-1);}else{document.getElementById('antigab_sen_' + current).style.visibility = 'hidden';document.getElementById('antigab_sen_5').style.visibility = 'visible';document.getElementById('antigab_current_sentence').value = '5';}";

antigab_output = '<div id="antigab_output_box">';
antigab_output += '<input type="hidden" id="antigab_current_sentence" name="antigab_current_sentence" value="1"/>';
antigab_output += '<div id="antigab_prev_sen"><input type="button" value="&#171;" onclick="' + prev_script + '"></div>';
antigab_output += '<div id="antigab_output_sentences">';
antigab_output += '<div id="antigab_output_sen_title">Most Meaningful Sentences</div>';
antigab_output += '<ol id="antigab_output_sen_list">';
var sen_count = 1;

if(sentence_scores.length > 6){
	for(var i = sentence_scores.length-1; i > sentence_scores.length-6; i--){
		var sentence = sentence_scores[i][0];
		sentence = return_periods(sentence);
		var sentence_words = sentence.split(" ");
		if(sen_count == 1){
			var sentence_out = '<div class="antigab_output_sen_ctrl" id="antigab_sen_' + String(sen_count) + '"><li class="antigab_output_sen_item"><span class="antigab_nobold">';
		}else{
			var sentence_out = '<div class="antigab_output_sen_ctrl" id="antigab_sen_' + String(sen_count) + '" style="visibility:hidden;"><li class="antigab_output_sen_item" id="antigab_sen_' + String(sen_count) + '"><span class="antigab_nobold">';
		}
		for( var x = 0; x < sentence_words.length; x++){
			if(cap_unique_words.indexOf(sentence_words[x]) != -1){
				sentence_out += '' + sentence_words[x] + ' ';
			}else if(unique_words.indexOf(sentence_words[x]) != -1){
				sentence_out += '' + sentence_words[x] + ' ';
			}else{
				sentence_out += sentence_words[x] + ' ';
			}
			
		}
		sentence_out += "</span></li></div>";
		antigab_output += sentence_out;
		sen_count++;
	}
}else{
	antigab_output += '<div id="antigab_output_nodata">' + 'Not enough text was found to display. Try highlighting the text and pressing the antigab button again.' + '</div>';
}


/*
function antigab_next_sen(){
		var current = document.getElementById('antigab_current_sentence').value;
	if(parseInt(current) != 3){
		document.getElementById('antigab_sen_' + current).style.visibility = "hidden";
		document.getElementById('antigab_sen_' + String(parseInt(current)+1)).style.visibility = "visible";
		document.getElementById('antigab_current_sentence').value = String(parseInt(current)+1);
	}else{
		document.getElementById('antigab_sen_' + current).style.visibility = "hidden";
		document.getElementById('antigab_sen_1').style.visibility = "visible"; 
		document.getElementById('antigab_current_sentence').value = "1";
	}
}
*/

antigab_output += '</ol></div>';
antigab_output += '<div id="antigab_next_sen"><input type="button" value="&#187;" onclick="' + next_script  + '"></div>';
antigab_output += '<div id="antigab_output_words"><div id="antigab_output_wo_title">Most Frequent Words</div><ul id="antigab_output_wo_list">';

if(unique_words_count.length > 12){
for(var i = unique_words_count.length-1; i > unique_words_count.length-7; i--){
antigab_output += '<li class="antigab_output_wo_item">' + unique_words_count[i][0] + ' - ' + unique_words_count[i][1] + '</li>';
}
}

antigab_output += '</ul></div></div>';


displaydiv.innerHTML =  stylesheet  + '<div id="antigab_display_box">' + titlehtml + titledesc + removebutton + aboutbutton + antigab_output;
document.body.appendChild(displaydiv);


})();
