alert('ada')
console.log('ddada')
// const app={
//     render: function (){
//         let url='https://jsonplaceholder.typicode.com/posts';
//         fetch(url)
//         .then(function(Response){
//           return Response.json();
//         })
//         .then(function(data){
//           var arr= [...data];
//          var html = data.map(function(song,index){
//           return ` 
//           <div class="song ${index===this.currentIndex ? 'active' :' '}" data-index="${index}">
//               <div class="thumb" 
//                   style="background-image: url('${song.userId}')">
//                </div>
//               <div class="body">
//                   <h3 class="title">${song.body}</h3>
//                   <p class="author">${song.title}</p>
//               </div>
//               <div class="option">
//                   <i class="fas fa-ellipsis-h"></i>
//               </div>
//           </div>`;
//          });
//          document.getElementById('class').innerHTML = html.join('');
  
//         })
//         .catch(function(err){
//           console.log(err);
//         });
//         return arr;
//       },
// }
// app.render();