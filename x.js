// const API_KEY="5ef09fce2ebc479595d9f88686241451";
// const url="https://newsapi.org/v2/everything?q=";


// window.addEventListener("load",  () =>  fetchNews("India"));

// function reload() {
//     window.location.reload();

// }

// async function fetchNews(query) {
//     const res=await   fetch(`${url}${query}&apiKey=${API_KEY}`)
//     const data=await res.json();
//       bindData(data.articles);

// }

// async function fetchNews(query) {
//     const url = `YOUR_API_URL${query}`;
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
        
//         // Check if data and articles exist before calling forEach
//         if (data && data.articles) {
//             bindData(data.articles);
//         } else {
//             console.error('No articles found in the response');
//             // Handle empty state - maybe show a message to the user
//             document.getElementById('cards-container').innerHTML = '<p>No news articles found</p>';
//         }
//     } catch (error) {
//         console.error('Error fetching news:', error);
//         // Handle error state
//         document.getElementById('cards-container').innerHTML = '<p>Error loading news</p>';
//     }
// }

const API_KEY ="5ef09fce2ebc479595d9f88686241451";
const url ="https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    try {
        const response = await fetch(`${url}${encodeURIComponent(query)}&apiKey=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data && data.articles) {
            bindData(data.articles);
        } else {
            console.error('No articles found in the response');
            document.getElementById('cards-container').innerHTML = '<p>No news articles found</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        document.getElementById('cards-container').innerHTML = '<p>Error loading news</p>';
    }
}
// function bindData(articles){
//     const cardsContainer= document.getElementById('cards-container');
//     const newsCardTemplate=document.getElementById('template-news-card');
//     cardsContainer.innerHTML="";
//      articles.forEach((articles) => {
//         if (!articles.urlToImage) return;
//         const cardClone =newsCardTemplate.content.cloneNode(true);
//         fillDataInCard(cardClone,articles)
//         cardsContainer.appendChild(cardClone);
        
//      }); 
// }

function bindData(articles) {
    // Add null check here as well
    if (!articles) return;

    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    
    cardsContainer.innerHTML = ""; // Clear existing cards

    articles.forEach((article) => {
        if (!article) return; // Skip if article is undefined
        
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,articles) {
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');

    newsImg.src =articles.urlToImage;
    newsTitle.innerHTML=articles.title;
    newsDesc.innerHTML=`${articles.description} click to read more....`;

     const date = new Date(articles.publishedAt).toDateString("en-us")
        // timeZone:"Asia/jakarta"
     

     newsSource.innerHTML=`Source: ${articles.source.name} On ${date} `;
      cardClone.firstElementChild.addEventListener("click", () => {
      window.open(articles.url,"_blank");


      })
}
 
let  curSelectedNav=null;
function onNavItemClick(id){

    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}
const searchButton=document.getElementById('search-button')
const searchText=document.getElementById('search-text')

searchButton.addEventListener("click",()=>{
    const query =searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;

})


