<% if(totalPages > 1){ %>
<ul class="pagination">
    <% if(currentPage > 1){ %>
    <li><a href="#" class="navigatable" data-page="1">&laquo;</a></li>
    <li><a href="" class="navigatable" data-page="<%-- previous %>">&lsaquo;</a></li>
    <% } else { %>
    <li class="disabled"><a href="#">&laquo;</a></li>
    <li class="disabled"><a href="#">&lsaquo;</a></li>
    <% } %>

    <% if(pageSet[0] > 1 ){ %>
    <li class="disabled"><a href="#">...</a></li>
    <% } %>

    <% _.each(pageSet, function(page){ %>
    <% if(page === currentPage){ %>
    <li class="active disabled"><a href="#"><%- page %></a></li>
    <% } else { %>
    <li><a href="#" class="navigatable" data-page="<%-- page %>"><%- page %></a></li>
    <% } %>
    <% }); %>

    <% if(pageSet[pageSet.length - 1] !== lastPage){ %>
    <li class="disabled"><a href="#">...</a></li>
    <li><a href="#" class="navigatable" data-page="<%-- lastPage %>"><%- lastPage %></a></li>
    <% } %>

    <% if(currentPage !== lastPage){ %>
    <li><a href="#" class="navigatable" data-page="<%-- next %>">&rsaquo;</a></li>
    <li><a href="#" class="navigatable" data-page="<%-- lastPage %>">&raquo;</a></li>
    <% } else { %>
    <li class="disabled"><a href="#">&rsaquo;</a></li>
    <li class="disabled"><a href="#">&raquo;</a></li>
    <% } %>
</ul>
<% } %>