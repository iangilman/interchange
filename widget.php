<?
require($_SERVER['DOCUMENT_ROOT'] . '/php/Page.php');

$info = array(
	'title' => 'Interchange Widget'
);

$page = new Page($info);
$page->Header();
?>

		<style type="text/css">
		</style>	
		<link rel="stylesheet" type="text/css" href="style/widget-maker.css"> 
		<script src="/js/jquery-1.8.2.min.js"></script>
		<script src="js/widget-maker.js"></script>
		<div id="left-column">
			<h1>Interchange Widget</h1>
			<p>To make an <a href=".">Interchange</a> widget for your site, enter the title and author below, and then copy the code out of the code box. Paste that code into the HTML editor for your blog post.</p>
			<div class="label">Title:</div>
			<p><input class="title" type="text" /></p>
			<div class="label">Author:</div>
			<p><input class="artist" type="text" /></p>
			<br>
			<div class="label">Code to copy: </div>
			<textarea class="code"></textarea>
			<p><a href="mailto:ian@iangilman.com">Let me know</a> if you have feature requests. For an example of the widget in action, see <a href="http://www.books4yourkids.com/2012/11/the-secret-history-of-hobgoblins-by.html" target="_blank">books4yourkids.com</a>.</p>
		</div>
		<div id="right-column">
		</div>

<?
$page->Footer();
?>

