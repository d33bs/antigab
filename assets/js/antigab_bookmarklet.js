(function(){

//check to see if we've got jquery already, if not bring it in
if (window.jQuery === undefined || jQuery.fn.jquery !== '1.9.1') {
	var done = false;
	var script = document.createElement("script");
	script.src = "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
	script.onload = script.onreadystatechange = function(){
		if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
			done = true;
			init_antigab();
		}
	};
	document.getElementsByTagName("head")[0].appendChild(script);
} else {
	init_antigab();
}

//main antigab functions and objects
function init_antigab() {
	(window.antigab = function() {
	
		window.let_window_scroll = true;
		window.using_chrome = /chrome(e|ium)/.test(navigator.userAgent.toLowerCase());
		window.using_safari = /safari/.test(navigator.userAgent.toLowerCase());
		
		function randomized_id(){
			var text = '';var possible= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			for(var i=0;i<10;i++){
				text += possible.charAt(Math.floor(Math.random()*possible.length));
			}
			return text;
		}
	
		//antigab display object
		var main_display = {
			data: {
				css_link: "<link href=\'//bntn.co/projects/antigab/assets/css/bookmarklet.css?"+ randomized_id() +"\' rel=\'stylesheet\' type=\'text/css\'>",
				version: "3",
				desc: "Use this bookmarklet to get a simple summary of the text content on any page. Highlight text for more refinement."
			},
			display_head: {},
			display_body: {},
			initialize: function(){
			
				this.display_head = $('#antigab_display').contents().find('head');
				this.display_body = $('#antigab_display').contents().find('body');
				
				$("#antigab_display").css({
					"width":"100%",
					"height":"130px",
					"position":"fixed",
					"z-index":"9000000000000",
					"background":"#fff",
					"top":"0",
					"left":"0",
					"border":"none",
					"border-bottom":"1px solid #fff",
					"border-top":"1px solid #fff",
					"box-shadow":"0 -5px 40px 10px #555",
					"overflow":"hidden"
				});
				
				this.initialize_content();
				this.initialize_events();				
			},
			destroy: function(){
				$('#antigab_display').remove();
				let_window_scroll = true;
			},
			initialize_events: function(){
				this.display_body.on("click","#close", function(){main_display.destroy();});
				this.display_body.on("click","#about", function(){window.open("//bntn.co/projects/antigab/");});
			},
			initialize_content: function(){
				this.display_head.append(this.data.css_link);
				
				//left side - title, description, bookmarklet controls
				this.display_body.append('<div id="left" class="inner-sizing"><div id="title_desc"><h1>Antigab <em>v'+this.data.version+'</em></h1><p>'+this.data.desc+'</p></div></div>');
				this.display_body.find("#left").append('<div id="button_box"><div id="button_center"><div id="about" class="button">About</div><div id="close" class="button">Close</div></div></div>');
				
				//middle and right side - dynamic content display, content controls, statistics
				this.display_body.append('<div id="main" class="inner-sizing"><div id="middle"><div id="prev" class="button"><span>&laquo;</span></div><div id="sentences" class="inner-sizing"><h3>Most summative sentences<span id="right_inner_title">Sentence #: <span id="sentence_number">1</span></span></h3><span id="sentence_content"></span><div id="bottom_bar"></div></div><div id="next" class="button"><span>&raquo;</span></div></div></div>');
				
				//right side with word occurences
				this.display_body.children("#main").append('<div id="right"><h4>Word occurrences</h4><div id="button_switch"><div id="uniques" class="switch_button switch_selected">Uniques</div><div id="commons" class="switch_button">Commons</div></div><div id="word_listing"></div></div>');
				
				//wrap everything in a wrapper for display purposes
				this.display_body.wrapInner('<div id="antigab_wrapper">');
			}
		};

		//object for displaying sentences
		var sentences_display = {
			data: {
				sentence_current: 0,
				sentence_max: 0,
				words_shown: "unique"
			},
			display_body: {},
			initialize: function(display_body){
				this.display_body = display_body;
				this.data.sentence_max = antigab_content.data.sentence_sort.length-1;
				this.display_body.find("#sentence_content").html(antigab_content.sentence_by_index(this.data.sentence_current));
				this.refresh_words();
				this.initialize_events();
			},
			initialize_events: function(){
				this.display_body.on("click","#prev", function(){sentences_display.previous();});
				this.display_body.on("click","#next", function(){sentences_display.next();});
				this.display_body.on("click","#uniques", function(){sentences_display.show_unique_words();});
				this.display_body.on("click","#commons", function(){sentences_display.show_common_words();});
				this.display_body.on("mouseover", function(e){
					let_window_scroll = false;
				});
				this.display_body.on("mouseout", function(e){
					let_window_scroll = true;
				});
				$("body").on("mousewheel DOMMouseScroll", function(e){
					if(!let_window_scroll){
						e.preventDefault();
						e.stopPropagation();
						return false;
					}
				});
			},
			refresh_words: function(){
				if(this.data.words_shown == "unique"){
					this.display_body.find("#word_listing").html(antigab_content.data.unique_word_output);
				}else{
					this.display_body.find("#word_listing").html(antigab_content.data.common_word_output);
				}
			},
			previous: function(){
				if(this.data.sentence_current-1 >= 0){
					this.data.sentence_current -= 1;
				}else{
					this.data.sentence_current = this.data.sentence_max;
				}
				this.display_body.find("#sentence_content").html(antigab_content.sentence_by_index(this.data.sentence_current));	
				this.display_body.find("#sentence_content").scrollTop(0);
				this.display_body.find("#sentence_number").html(String(this.data.sentence_current+1));
			},
			next: function(){
				if(this.data.sentence_current+1 <= this.data.sentence_max){
					this.data.sentence_current += 1;
				}else{
					this.data.sentence_current = 0;
				}
				this.display_body.find("#sentence_content").html(antigab_content.sentence_by_index(this.data.sentence_current));
				this.display_body.find("#sentence_content").scrollTop(0);
				this.display_body.find("#sentence_number").html(String(this.data.sentence_current+1));
			},
			show_unique_words: function(){
				this.data.words_shown = "unique";
				this.display_body.find("#commons").removeClass("switch_selected");
				this.display_body.find("#uniques").addClass("switch_selected");
				this.refresh_words();
			},
			show_common_words: function(){
				this.data.words_shown = "common";
				this.display_body.find("#uniques").removeClass("switch_selected");
				this.display_body.find("#commons").addClass("switch_selected");
				this.refresh_words();
			},
			wikipedia_search_request: function(word_string){
				var request_url = "//en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+word_string+"&srlimit=1&format=json";
				var view = this;
				var ajax_request = $.ajax({
						type: 'GET',
						url: request_url,
						async: false,
						contentType: "application/json",
						dataType: 'jsonp',
						success: function(data){
							view.change_unique(data,word_string);
						}
				});
			},
			change_unique: function(data, word_string){
				//console.log(word_string);
				if(data.query.search.length >= 1){
					word_string = (word_string+'').replace(/([\\"'])/g, "\\$1").replace(/\0/g, "\\0");
					var link = "http://en.wikipedia.org/wiki/" + data.query.search[0].title.replace(/ /g,"_");
					antigab_content.data.unique_word_wiki_links[word_string] = link;
					var temp_finder = $('<div/>').html(antigab_content.data.unique_word_output);
					temp_finder.find(".word:contains('"+word_string+"')").wrapInner('<a href="'+link+'" target="_blank">');
					antigab_content.data.unique_word_output = String(temp_finder.html());
					if(this.display_body.find("#uniques").hasClass("switch_selected")){
						this.show_unique_words();
					}
				}
			},
			wikipedia_unique_digging: function(){
				var view = this;
				for(var i=0; i<antigab_content.data.unique_word_sort.length; i++){
					view.wikipedia_search_request(String(antigab_content.data.unique_word_sort[i].key),false);
				}
			}
		};
		
		//object for storing antigab data
		var antigab_content = {
			data: {
				sentences: [],
				words: [],
				common_words: [],
				unique_words: [],
				common_word_counts: {},
				unique_word_counts: {},
				common_word_sort: [],
				unique_word_sort: [],
				unique_word_wiki_links: {},
				common_word_output: "",
				unique_word_output: "",
				sentence_scores: {},
				sentence_sort: [],
				raw: "",
				raw_words: ""
			},
			removal: {
				words: ["Share this page","an","and","as","        ","youre","going","im","get","got","okay","thats","tell","having","then","cant","theyre","theres","","president","very","him","her","why","if","is","want","any","really","take","ive","although","a","something","mr","mrs","ms","&#160;","able","lots","better","&nbsp;","\n\r","done","none","look","end","some","stick","recent","types","here","you","your","thy","shall","must","tis","make","much","nor","do","am","us","leave","came","\n","\r","-","--","---","on","the","to","that","by","in","he","has","and","for","is","a","of","his","an","it","its","it's","its'","as","can","who","over","from","mr","mrs","ms","with","or","both","were","would","have","like","said","about","not","was","I","me","what","will","be","when","are","out","all","at","more","than","those","had","been","says","such","since","into","least","before","ties","after","might","figure","she","estimated","week","we","still","but","doing","office","so","need","asked","while","part","no","set","took","including","parts","because","begun","they","just","only","say","this","up","could","don't","also","other","state","where","ever","big","give","too","near","let","even","many","little","plan","rest","made","last","through","whether","there","nations","their","toward","them","good","now","heavy","city","around","use","staff","chief","report","known","during","dont","nations","most","year","active","which","our","my","her","did","its","may","time","how","person","see","...","..","ampersand","&lsquo;","&rsquo;","&sbquo;","&ldquo;","&rdquo;","&bdquo;","&dagger;","&Dagger;","&permil;","&lsaquo;","&rsaquo;","&spades;","&clubs;","&hearts;","&diams;","&oline;","&larr;","&uarr;","&rarr;","&darr;","&trade;"],
				paragraph_classes: ["comment-footer","storydate","poweredByPostRank","ad","filed","posted","post-info","bottom-left","post_tags","byline","cmt_ops","seemore-wpw","wpw-sponsor","wpw-type","wpw-teaser","by","blq-hide","blq-disclaim","blq-footer-image-dark","disclaimer","blq-no-images","caption","bbc-st-basic","popular","element1","loggedIn","loggedOut","general","refer","summary","prev","next","time","radio","image-caption","echo-badge-info-link","heading","issue","cutline","infotext"],
				paragraph_classes_string: "",
				paragraph_contains: ['<a target="_blank" href="http://twitter.com/','<a name="share"></a>','by\n<a href="/user/','<a class="permalink"','<div class="storynav_next">','Sharing this page','Please enter the email address','<a href="http://www.thomsonreuters.com">Thomson Reuters</a>','Comments our editors','Click the button below','Your e-mail is used','CNET Blog Network','On your next visit','You are now logged in','Default comment.','<span id="dna-comment-count','Share this page','<span class="blq-home">',"Read more about these links.", "Read more.","Show My Recommendations Go to Complete List","Show My Recommendations Log","Privacy Policy | What’s This?","Don’t Show?","Log in to see what your friends are sharing on nytimes.com.","Go to Complete List","Go to Your Recommendations","More Photos »", "Terms and conditions", "= Premium Content","Name Email Required","Back to top","→ Learn More", "Sponsored link:","»","You are logged into Facebook",'<span class="views">',"Twitter List:","Verified Commenter","This article has been revised to reflect the following correction:","Share your thoughts","var _obj","RECENT AND RELATED","|","Source:","SEE ALSO:","Login with LinkedIn","Forgot username or password?","No articles have recently been shared in your network.","Our website uses cookies,"]
			},
			ignore: {
				abbreviations: ["Mr.","Ms.","Mrs.","Sr.","Mr.","Dr.","Jan.","Feb.","Mar.","Apr.","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec.","U.S.","U.S.A.", "M.C.","A.","B.","C.","D.","E.","F.","G.","H.","I.","J.","K.","L.","M.","N.","O.","P.","Q.","R.","S.","T.","U.","V.","W.","X.","Y.","Z."]
			},
			initialize: function(){
				this.prep();
				this.intake();
				this.word_sort();
				this.create_word_output();
				this.sentence_sort();
			},
			prep: function(){
				this.paragraph_classes_string_prep();
				this.remove_words_prep();
			},
			paragraph_classes_string_prep: function(){
				for(var i=0; i < this.removal.paragraph_classes.length; i++){
					if(i === 0){
						this.removal.paragraph_classes_string += "."+this.removal.paragraph_classes[i];
					}else{
						this.removal.paragraph_classes_string += ",."+this.removal.paragraph_classes[i];
					}
				}
			},
			remove_words_prep: function(){
				this.removal.words = this.removal.words.concat(this.ignore.abbreviations);
			},
			intake: function(){
				this.raw_intake();
				this.sentences_intake();
				this.words_intake();
			},
			raw_intake: function(){
				var raw_highlighted = this.highlighted_text_grab();
				
				//see if any text is highlighted
				if(raw_highlighted.length > 20){
					//replace line breaks with spaces - similar to default method
					this.data.raw = raw_highlighted;
				}else{
					var model = this;
					this.data.raw = $("p").not(this.removal.paragraph_classes_string).map(function() {
						var contained_bad_stuff = false;
						for(var i=0; i < model.removal.paragraph_contains.length; i++){
   							if($.text(this).indexOf(model.removal.paragraph_contains[i]) !== -1){
   								contained_bad_stuff = true;
   								break;
   							}
   						}
   						if(!contained_bad_stuff){
   							return $.text(this);
   						}
					}).get().join(" ");
				}
				this.raw_clean();
			},
			raw_clean: function(){
			
				this.data.raw = this.data.raw.replace(/\r\n|\r|\n/g,' ');
			
				//remove specific pieces from the content
				for(var i=0; i < this.removal.paragraph_contains.length; i++){
					var re = new RegExp(this.removal.paragraph_contains[i],"g");
					this.data.raw = this.data.raw.replace(re, "");
				}
				
				//replace multi-spaces with single space
				//this.data.raw = this.data.raw.replace(/ +(?= )/g,'');
				this.data.raw = this.data.raw.replace(/\s{2,}/g, ' ');
				
				//replace curly quotes with normal ones
				this.data.raw = this.data.raw.replace(/[\u201C\u201D]/g, '"');
				
				//replace beginning space in raw if it exists
				if(this.data.raw[0] == " "){
					this.data.raw = this.data.raw.substring(1, this.data.raw.length);
				}
				
			},
			highlighted_text_grab: function(){
				var text = "";
				if (window.getSelection) {
					text = window.getSelection().toString();
				} else if (document.selection && document.selection.type != "Control") {
					text = document.selection.createRange().text;
				}
				return text;
			},
			sentences_intake: function(){
				var sentence = "";
				var ignore_found = false;
				var complete_sentence = false;
				
				//step through raw content char by char (carefully!)
				for(var i=0; i < this.data.raw.length; i++){
					sentence += this.data.raw[i];
					
					//if we find a punctuation mark start checking for sentence structure
					//note: order is important here
					if((this.data.raw[i]=="."||this.data.raw[i]=="?"||this.data.raw[i]=="!") && i != this.data.raw.length-1){
						
						//if we have a punctuation mark and a quotation next end the sentence
						if(this.data.raw[i+1] == '"'){
							i+=2;
							sentence += '"';
							complete_sentence = true;
							
						//if we have an exclamation or question mark and the next char is a space end the sentence
						}else if((this.data.raw[i] == "!"||this.data.raw[i] == "?") && this.data.raw[i+1] == " "){
							i+=1;
							complete_sentence = true;
							
						//if we find a period and the next char is a space - 
						//do further checking to see if it's really the end of a sentence
						}else if(this.data.raw[i] == "." && this.data.raw[i+1] == " "){
							
							//checking within the abbreviations array for stuff we want to ignore
							for(var b=0; b < this.ignore.abbreviations.length; b++){
							
								//check that we have enough length in the sentence for the ignore to even exist
								if(sentence.length >= this.ignore.abbreviations[b].length){
									
									//chunk off a previous section for comparison
									var previous = sentence.substring(sentence.length-this.ignore.abbreviations[b].length, sentence.length);
									
									//compare the ignore with the previous chunk
									//also check for a space behind to ensure we're not blind to additional chars
									if(previous == this.ignore.abbreviations[b] && this.data.raw[i-1] === " "){
										ignore_found = true;
										break;
									}
								}
							}
							if(!ignore_found){
								i+=1;
								complete_sentence = true;	
							}
							ignore_found = false;
						}	
					}
					if(complete_sentence){
						this.data.sentences.push(sentence);
						sentence = "";
						complete_sentence = false;
					}
				}
			},
			words_intake: function(){
				this.data.words = this.data.raw.split(" ");
				this.words_clean();
			},
			words_clean: function(){
				for(var i=0; i < this.data.words.length; i++){
					this.data.words[i] = this.data.words[i].replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'");
					this.data.words[i] = this.data.words[i].replace(/[^A-Za-z \'\-]+/g,'');
					if(this.removal.words.indexOf(this.data.words[i]) > -1){
						this.data.words.splice(i,1);
						i--;
					}else if(this.removal.words.indexOf(this.data.words[i].toLowerCase()) > -1){
						this.data.words.splice(i,1);
						i--;
					}
					
				}
			},
			word_sort: function(){
				for(var i=0; i < this.data.words.length; i++){
					if(this.data.words[i][0] == this.data.words[i][0].toUpperCase() && this.data.words.indexOf(this.data.words[i].toLowerCase) <= -1){
						this.data.unique_words.push(this.data.words[i]);
						if(this.data.unique_word_counts[this.data.words[i]] != undefined){
							this.data.unique_word_counts[this.data.words[i]] += 1;
						}else{
							this.data.unique_word_counts[this.data.words[i]] = 1;
						}
					}else{
						this.data.common_words.push(this.data.words[i]);
						if(this.data.common_word_counts[this.data.words[i]] != undefined){
							this.data.common_word_counts[this.data.words[i]] += 1;
						}else{
							this.data.common_word_counts[this.data.words[i]] = 1;
						}
					}
				}
				this.data.unique_word_sort = this.sort_count_obj(this.data.unique_word_counts);
				this.data.common_word_sort = this.sort_count_obj(this.data.common_word_counts);
				
			},
			create_word_output: function(){
				for(var i=0; i<this.data.common_word_sort.length; i++){
					this.data.common_word_output += '<span class="word_row"><span class="word">';
					this.data.common_word_output += String(this.data.common_word_sort[i].key);
					this.data.common_word_output += '</span><span class="word_count">';
					this.data.common_word_output += String(this.data.common_word_sort[i].value);
					this.data.common_word_output += '</span></span>';
				}
				for(var i=0; i<this.data.unique_word_sort.length; i++){
					this.data.unique_word_output += '<span class="word_row"><span class="word">';
					this.data.unique_word_output += String(this.data.unique_word_sort[i].key);
					this.data.unique_word_output += '</span><span class="word_count">';
					this.data.unique_word_output += String(this.data.unique_word_sort[i].value);
					this.data.unique_word_output += '</span></span>';
				}
			},
			sentence_sort: function(){
				for (key in this.data.unique_word_counts) {
					if (this.data.unique_word_counts.hasOwnProperty(key)) {
						for(var i=0; i < this.data.sentences.length; i++){
							if(this.data.sentences[i].indexOf(key) > -1){
								if(this.data.sentence_scores[this.data.sentences[i]] != undefined){
									this.data.sentence_scores[this.data.sentences[i]] += this.data.unique_word_counts[key]*2;
								}else{
									this.data.sentence_scores[this.data.sentences[i]] = this.data.unique_word_counts[key]*2;
								}
							}
						}
					}
				}
				for (key in this.data.common_word_counts) {
					if (this.data.common_word_counts.hasOwnProperty(key)) {
						for(var i=0; i < this.data.sentences.length; i++){
							if(this.data.sentences[i].indexOf(key) > -1){
								if(this.data.sentence_scores[this.data.sentences[i]] != undefined){
									this.data.sentence_scores[this.data.sentences[i]] += this.data.common_word_counts[key];
								}else{
									this.data.sentence_scores[this.data.sentences[i]] = this.data.common_word_counts[key];
								}
							}
						}
					}
				}
				this.data.sentence_sort = this.sort_count_obj(this.data.sentence_scores);
			},
			sort_count_obj: function(obj) {
				var arr = [];
				var prop;
				for (prop in obj) {
					if (obj.hasOwnProperty(prop)) {
						arr.push({
							'key': prop,
							'value': obj[prop]
						});
					}
				}
				arr.sort(function(a, b) {
					return b.value - a.value;
				});
				return arr;
			},
			sentence_by_index: function(index){
				if(this.data.sentence_sort.length > 0){
					return String(this.data.sentence_sort[index].key);
				}
			},
			debug_out: function(){
				//console.log(this.data.raw);
				//console.log(this.data.sentences);
				//console.log(this.data.words);
				//console.log(this.data.unique_word_counts);
				//console.log(this.data.sentence_scores);
				//console.log(this.data.sentence_sort);
			}
		};
			
		
		
		
			
		//runtime		
		
		
		if($('#antigab_display').length !== 0){
			$('#antigab_display').remove();
		}
		//check for webkit vs others since DOM loading is weird across browsers (most notably Firefox)
		if (using_chrome || using_safari){
			$('<iframe id="antigab_display">').appendTo('body');
			main_display.initialize();
			antigab_content.initialize();
			sentences_display.initialize(main_display.display_body);
		
		}else{
			$('<iframe id="antigab_display">').appendTo('body').load(function(){
				main_display.initialize();
				antigab_content.initialize();
				sentences_display.initialize(main_display.display_body);
			});
		}
		
		sentences_display.wikipedia_unique_digging();

})();
}
})();

