document.addEventListener("DOMContentLoaded", function () {
  let currentPage = 1;
  let totalPages = 2;

  const fetchData = async (page) => {
    try {
    console.log("$$$$$$$$")
      const response = await fetch(`./data/page${page}.json`);
      const jsonData = await response.json();
      console.log("SSS",jsonData.publications)
      
      return jsonData.publications;

    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const displayData = (items) => {

    let publicationsResult = "";
    items.map((a, e) => {
        console.log(a.detail)
      publicationsResult += `
        <div  onclick="showModal('${
          a.detail
        }','${a.title}')" class="projectCart">
 <div class="projectCart_text">
            <h4 class="projectCart_text_title">${a.title}</h4>
            <p class="projectCart_text_detail">
${a.subtitle}
</p>
        </div>
        <div class="projectCart_image">
            <img data-src="${a.image}" class="lazyload  projectCart_image_img" />
        </div>
        </div>
  
  `;
    });
    console.log("SSS",publicationsResult)
    
    let e = document.getElementById("publications_box_team");
    let button = document.getElementById("loadMoreButton");
    if (totalPages == currentPage) {
      button.remove();
    }
    console.log("SSS",publicationsResult)
    
    e.innerHTML += publicationsResult;
  };

  const loadMore = async () => {
    console.log("SSS")
    if (currentPage < totalPages) {
      currentPage++;
      const nextPageData = await fetchData(currentPage);
      displayData(nextPageData);
    } else {
      console.log("No more pages to load.");
    }
  };

  const initPagination = async () => {
    const initialPageData = await fetchData(currentPage);
    displayData(initialPageData);
  };

  initPagination();

  document.getElementById("loadMoreButton").addEventListener("click", loadMore);
});