import BlogLayout from '../../components/blog/BlogLayout'
import GenericHead from '../../components/generichead/GenericHead'
function BlogIndex() {
  return (
    <>
      <GenericHead
        title="Los Junior - Blog 🤓"
        description="Únete a Los Junior. Toma el camino del aprendiz, conviértete en desarrollador de software y hazte un nombre en la comunidad mientras aprendes cosas nuevas."
        type="blog"
        url="https://losjunior.co/blog/"
        image="https://user-images.githubusercontent.com/71573508/128596164-60821f54-9b7a-4e98-a302-19291fa22a7f.png"
      />
      <BlogLayout />
    </>
  )
}

export default BlogIndex
