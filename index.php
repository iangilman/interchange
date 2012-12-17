<?
require($_SERVER['DOCUMENT_ROOT'] . '/php/Page.php');

$info = array(
	'title' => 'Interchange'
);

$page = new Page($info);
$page->Header();
?>

		<style type="text/css">
			.bookmarklet {
				background-color: #3295ad;
				-moz-border-radius: 4px;
				-webkit-border-radius: 4px;
				padding: 2px 4px;
			}
			a:link.bookmarklet,
			a:visited.bookmarklet,
			a:hover.bookmarklet,
			a:active.bookmarklet {
				color: white;
			}			
		</style>	
		<div id="left-column">
			<h1>Interchange</h1>
			<p><img src="/img/projects/interchange.png" style="float:right; margin-left: 5px">This bookmarklet sits on your browser's bookmark bar. Hit it when you're on the page for a book on any of the supported sites, and it'll pop up a set of links to take you to that same book on any of the other supported sites. It also works with music artists and albums. Now you're never stuck in one site when you want to be in another!</p>

			<p>To install, drag this --&gt; <a href="javascript:var%20b=document.body;if(b&&!document.xmlVersion){void(z=document.createElement('script'));void(z.src='http://iangilman.com/interchange/js/bookmarklet.js');void(b.appendChild(z));}else{}" class="bookmarklet">interchange</a> &lt;-- to your bookmark bar (just below the URL bar in your browser). </p>

			<p>Currently supports books and music from:</p>
			
			<div class="content-list">
				<ul>
					<li><a href="http://amazon.com">Amazon</a></li>
					<li><a href="http://goodreads.com">Goodreads</a></li>
					<li><a href="http://rdio.com">Rdio</a></li>
					<li><a href="http://last.fm">Last.fm</a></li>
					<li><a href="http://spl.org">Seattle Public Library</a></li>
					<li><a href="http://letsfathom.com">Fathom</a></li>
					<li><a href="http://www.books4yourkids.com/">books4yourkids.com</a></li>
					<li><a href="http://www.indiebound.org/">IndieBound</a></li>
					<li><a href="http://www.powells.com/">Powell's</a></li>
				</ul>
			</div>
			
			<p>... and we're toying with detecting movies as well, starting with <a href="http://www.netflix.com">Netflix</a>.</p>

			<p>It may not work on every page... if you find any that don't work, please report them and I'll fix them as soon as I can. Also feel free to let me know other sites you'd like to see added, or other features you're interested in.</p>
			
			<p>If you'd like to add some Interchange magic to your website or blog, head over to the <a href="widget.php">Interchange Widget</a> page to grab an HTML snippet for an Interchange button for a specific book or album.</p>
			
			<p class="footnote">(<a href="http://www.flickr.com/photos/thunderchild5/71539277/">"tunnel" photo</a> by <a href="http://www.flickr.com/photos/thunderchild5/">Thunderchild7</a>)</p>
		</div>
		<div id="right-column">
		</div>

<?
$page->Footer();
?>

