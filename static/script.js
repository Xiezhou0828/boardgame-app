let currentGames = []; // 存儲當前類型的遊戲列表

function fetchGames(category) {
    fetch(`/games/${category}`)
        .then(response => response.json())
        .then(games => {
            currentGames = games; // 更新當前遊戲列表
            displayGames(games); // 顯示所有遊戲

            // 啟用玩家人數篩選器
            const playerFilter = document.getElementById("player-filter");
            playerFilter.disabled = false; // 啟用篩選器
            playerFilter.value = "all"; // 重置篩選器為「全部」
        })
        .catch(error => console.error("Error fetching games:", error));
}

function displayGames(games) {
    const gamesList = document.getElementById("games");
    gamesList.innerHTML = ""; // 清空列表

    games.forEach(game => {
        const listItem = document.createElement("li");
        listItem.textContent = game.name;

        // 添加滑鼠懸停工具提示功能
        listItem.addEventListener("mouseover", () => {
            showTooltip(listItem, `建議人數: ${game.players}<br>遊玩時間: ${game.time}`);
        });
        listItem.addEventListener("mouseout", hideTooltip);

        gamesList.appendChild(listItem);
    });

    document.getElementById("game-list").style.display = "block"; // 顯示遊戲列表
}

function filterGames() {
    const playerFilter = document.getElementById("player-filter").value;
    let filteredGames = currentGames;

    if (playerFilter !== "all") {
        const selectedPlayers = parseInt(playerFilter);

        filteredGames = currentGames.filter(game => {
            const playerRange = game.players.split("-").map(str => parseInt(str.replace(/[^0-9]/g, "")));
            const minPlayers = playerRange[0];
            const maxPlayers = playerRange.length > 1 ? playerRange[1] : minPlayers;

            return selectedPlayers >= minPlayers && selectedPlayers <= maxPlayers;
        });
    }

    displayGames(filteredGames);
}

function showTooltip(element, content) {
    let tooltip = document.getElementById("tooltip");
    if (!tooltip) {
        tooltip = document.createElement("div");
        tooltip.id = "tooltip";
        document.body.appendChild(tooltip);
    }
    tooltip.innerHTML = content;
    tooltip.style.display = "block";
    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.pageXOffset}px`;
    tooltip.style.top = `${rect.top + window.pageYOffset + rect.height}px`;
}

function hideTooltip() {
    const tooltip = document.getElementById("tooltip");
    if (tooltip) {
        tooltip.style.display = "none";
    }
}













