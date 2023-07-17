# Parcel 

Project is build wsth Parcel.

## About service

 Application presents news, published by NY Times. 
 In this project implemented responsive markup. Main page shows user popular news.
 Using category links user can select any other news category. 
 Also implemented search by news' title. 
 On read page are stored news, already read by user (stored in local storage). Favorite page allows user to save certain articles as favorite.
On pages also made pagination using tui-pagination.

## Categories

Clicking category link initiating GET request to NYT for news with certain category (axios).

## READ page

Articles storing to "read page" after clicking on link "read more" and saved on local storage.
On start application - localstorage is checked for this data, and if present this data forwarded to markup function.

## Favorite page
Similar to "read news" page, but on this page presented news, saved as "favorite" by used. Unlike "read news" - favorite articles can be removed by user.
