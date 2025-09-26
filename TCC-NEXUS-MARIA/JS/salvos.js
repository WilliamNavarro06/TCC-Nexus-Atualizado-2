const savedContainer = document.getElementById('saved-container');
const viewDeletedBtn = document.getElementById('view-deleted-btn');
const notificationModal = document.getElementById('notification-modal');
const notificationContent = document.getElementById('notification-content');

let deletedPosts = JSON.parse(sessionStorage.getItem('deletedPosts')) || [];

// Função para exibir notificação moderna
function showNotification(msg){
    notificationContent.textContent = msg;
    notificationModal.classList.add('show');
    setTimeout(()=> notificationModal.classList.remove('show'), 2500);
}

// Clique nos cards
savedContainer.addEventListener('click', (e)=>{
    const card = e.target.closest('.saved-card');
    if(!card) return;

    // Lixeira Vermelha
    if(e.target.classList.contains('remove-icon')){
        deletedPosts.push({
            id: card.dataset.id,
            html: card.outerHTML
        });
        card.remove();
        sessionStorage.setItem('deletedPosts', JSON.stringify(deletedPosts));
        showNotification('Post excluído! Você pode ver em "Ver Excluídos".');
    }
    // Clique no post
    else{
        const title = card.querySelector('h3').textContent;
        showNotification('Visualizando post: ' + title);
    }
});

// Ver Excluídos
viewDeletedBtn.addEventListener('click', ()=>{
    sessionStorage.setItem('deletedPosts', JSON.stringify(deletedPosts));
    window.location.href = 'excluidos.html';
});
