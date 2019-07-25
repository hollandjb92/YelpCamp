# YelpCamp

<p>YelpCamp is a web application built using Node.js, Express.js, RESTFUL Routing, EJS, and several other frameworks and middle-ware. This application is a makeshit-shift clone of Yelp that focuses on reviewing campsites and sharing information about them. It was made while completing <a href="https://www.udemy.com/the-web-developer-bootcamp/" rel="nofollow">The Web Developer Bootcamp</a> course on <a href="https://www.udemy.com/" rel="nofollow">Udemy</a></p>


## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

<p>You will need <a href="https://nodejs.org/en/">Node.js</a> and  <a href="https://www.npmjs.com/">NPM</a>  installed on your system.</p>

### Installing

<ol>
<li>
<p>Clone project:</p>
<pre><code> "git clone https://github.com/hollandjb92/YelpCamp.git"
</code></pre>
</li>
<li>
<p>To install all the necessary npm packages, inside the root directory of the cloned filed, run the following command in your terminal/bash:</p>
<pre><code> "npm install"
</code></pre>
</li>
</ol>

## Quick Look

![yelpCamp HomePage](https://i.imgur.com/rVAvK6r.jpg)


<h3><a id="user-content-restful-routes" class="anchor" aria-hidden="true" href="#restful-routes"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>RESTFUL Routing</h3>
<p>Application of <strong>RE</strong>presentational <strong>S</strong>tate <strong>T</strong>ransfer (REST)</p>
<h4><a id="user-content-campground-routes" class="anchor" aria-hidden="true" href="#campground-routes"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Campground Routes</h4>
<table>
<thead>
<tr>
<th>Name</th>
<th>Path</th>
<th>HTTP Verb</th>
<th>Purpose</th>
<th>Mongoose Method</th>
</tr>
</thead>
<tbody>
<tr>
<td>Index</td>
<td><code>/campgrounds</code></td>
<td>GET</td>
<td>List all campgrounds</td>
<td>Campground.find()</td>
</tr>
<tr>
<td>New</td>
<td><code>/campgrounds/new</code></td>
<td>GET</td>
<td>Show a form to add a new campground</td>
<td>N/A</td>
</tr>
<tr>
<td>Create</td>
<td><code>/campgrounds</code></td>
<td>POST</td>
<td>Create a new campground, then redirect somewhere</td>
<td>Campground.create()</td>
</tr>
<tr>
<td>Show</td>
<td><code>/campgrounds/:id</code></td>
<td>GET</td>
<td>Show info about one specific campground</td>
<td>Campground.findById()</td>
</tr>
<tr>
<td>Edit</td>
<td><code>/campgrounds/:id/edit</code></td>
<td>GET</td>
<td>Show edit form for one campground</td>
<td>Campground.findById()</td>
</tr>
<tr>
<td>Update</td>
<td><code>/campgrounds/:id</code></td>
<td>PUT</td>
<td>Update a particular campground, then redirect somewhere</td>
<td>Campground.findByIdAndUpdate()</td>
</tr>
<tr>
<td>Destroy</td>
<td><code>/campgrounds/:id</code></td>
<td>DELETE</td>
<td>Delete a particular campground, then redirect somewhere</td>
<td>Campground.findByIdAndRemove()</td>
</tr>
</tbody>
</table>
<h4><a id="user-content-comment-routes" class="anchor" aria-hidden="true" href="#comment-routes"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Comment Routes</h4>
<table>
<thead>
<tr>
<th>Name</th>
<th>Path</th>
<th>HTTP Verb</th>
<th>Purpose</th>
<th>Mongoose Method</th>
</tr>
</thead>
<tbody>
<tr>
<td>New</td>
<td><code>/campgrounds/:id/comments/new</code></td>
<td>GET</td>
<td>Show a form to add a new comment</td>
<td>N/A</td>
</tr>
<tr>
<td>Create</td>
<td><code>/campgrounds/:id/comments/</code></td>
<td>POST</td>
<td>Create a new comment, then redirect somewhere</td>
<td>Comment.create()</td>
</tr>
<tr>
<td>Edit</td>
<td><code>/campgrounds/:id/comments/:comment_id/edit</code></td>
<td>GET</td>
<td>Show edit form for one comment</td>
<td>Comment.findById()</td>
</tr>
<tr>
<td>Update</td>
<td><code>/campgrounds/:id/comments/:comment_id</code></td>
<td>PUT</td>
<td>Update a particular comment, then redirect somewhere</td>
<td>Comment.findByIdAndUpdate()</td>
</tr>
<tr>
<td>Delete</td>
<td><code>/campgrounds/:id/comments/:comment_id</code></td>
<td>DELETE</td>
<td>Delete a particular comment, then redirect somewhere</td>
<td>Comment.findByIdAndRemove()</td>
</tr>
</tbody>
</table>

## Built With
<ul>
<li><a href="https://nodejs.org/en/">Node.js</a></li>
<li><a href="https://www.npmjs.com/package/express" rel="nofollow">Express</a></li>
  <li><a href="https://www.mongodb.com/" rel="nofollow">MongoDB</a></li>
  <li><a href="https://www.npmjs.com/package/mongoose" rel="nofollow">Mongoose</a></li>
    <li><a href="https://www.npmjs.com/package/passport" rel="nofollow">Passport.js</a></li>
<li><a href="https://www.npmjs.com/package/body-parser" rel="nofollow">Body-Parser</a></li>
    <li><a href="https://www.npmjs.com/package/ejs" rel="nofollow">Embedded Javascript Templating (EJS)</a></li>
       <li><a href="https://www.npmjs.com/package/moment" rel="nofollow">Moment.js</a></li>
  <li><a href="https://www.npmjs.com/package/dotenv" rel="nofollow">DotEnv</a></li>
</ul>
