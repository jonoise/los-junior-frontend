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
        image="https://user-images.githubusercontent.com/71573508/128595885-33bf4c64-5620-4ae2-99b3-e4a0f5e45ce1.png"
      />
      <BlogLayout />
    </>
  )
}

export default BlogIndex
