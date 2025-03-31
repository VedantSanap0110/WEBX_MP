document.addEventListener("DOMContentLoaded", function () {
    // Attach event listener only if we're on the dashboard page
    let submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
        submitBtn.addEventListener("click", fetchTopDishes);
    }
});

function fetchTopDishes() {
    let foodType = document.getElementById("foodType").value;
    let topN = document.getElementById("topN").value;
    let day = document.getElementById("daySelect").value;

    fetch(`/top_dishes?food_type=${foodType}&n=${topN}&day=${day}`)
        .then(response => response.json())
        .then(data => {
            let resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "<h3>Top Dishes (Percentage of Total):</h3>";
            
            if (!data || Object.keys(data).length === 0) {
                resultDiv.innerHTML += "<p>No data available for the selected options.</p>";
                return;
            }
            
            // The backend returns a dictionary of {dish: percentage}
            let sortedDishes = Object.entries(data).sort((a, b) => b[1] - a[1]);
            let listHTML = "<ul>";
            sortedDishes.forEach(([dish, pct]) => {
                listHTML += `<li><strong>${dish}:</strong> ${pct}%</li>`;
            });
            listHTML += "</ul>";
            resultDiv.innerHTML += listHTML;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("result").innerHTML = "<p style='color:red;'>Error fetching data. Please try again.</p>";
        });
}
