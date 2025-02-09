export default function RecommendedArticle(){
    return(            
      <article className="flex max-w-[330px]">
        <div className="w-full flex justify-center items-center --article">
          <div className="w-2/5 h-[130px] bg-red-200 rounded-lg overflow-hidden">
            <img src="https://i.pinimg.com/564x/be/ad/bc/beadbc756dac2931ff110948e17d68bd.jpg" alt="recommend" className="h-full object-cover --article--pic"/>
          </div>
          <p className="w-3/5 text-[15px] text-gray-600 ml-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, quae?</p>
        </div>
      </article>
      )
}