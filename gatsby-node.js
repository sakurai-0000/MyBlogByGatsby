const path = require('path')
const { reporter } = require('process')

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogDetail = path.resolve('./src/template/blogDetail.js')
  const blogTemplate = path.resolve('./src/template/blogTemplate.js')
  const codeTemplate = path.resolve('./src/template/codeTemplate.js')
  const res = await graphql(`
    query{
      allContentfulCode(sort: {fields: createdDate, order: DESC}) {
        edges {
          node {
            id
            slug
            category {
              categorySlug
            }
          }
          next {
            title
            slug
            category {
              categorySlug
            }
          }
          previous {
            title
            slug
            category {
              categorySlug
            }
          }
        }
      }
      allContentfulCategory {
        edges {
          node {
            categorySlug
            id
            category
            code {
              title
            }
          }
        }
      }
    }
  `)
  if (res.errors) {
    reporter.panicOnBuild(`text`, new Error('GraphQlのクエリでエラーが発生しました'))
    return
  }

  res.data.allContentfulCode.edges.forEach((edge) => {
    createPage({
      component: blogDetail,
      path: `/code/${edge.node.category[0].categorySlug}/${edge.node.slug}`,
      context: {
        slug: edge.node.slug,
        next: edge.next,
        previous: edge.previous,
        category: edge.node.category[0].categorySlug,
      }
    })
  })

  res.data.allContentfulCategory.edges.forEach(({ node }) => {
    const codePostPerpage = 3 //１ページに表示する記事の数
    const codePosts = node.code.length //記事の総数
    const codePages = Math.ceil(codePosts / codePostPerpage) //記事一覧ページの総数

    Array.from({ length: codePages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/code/${node.categorySlug}`
            : `/code/${node.categorySlug}/${i + 1}/`,
        component: codeTemplate,
        context: {
          codeId: node.id,
          codeName: node.category,
          codeSlug: node.categorySlug,
          skip: codePostPerpage * i,
          limit: codePostPerpage,
          currentPage: i + 1, // 現在のページ番号
          isFirst: i + 1 === 1, //最初のページ
          isLast: i + 1 === codePages, // 最後のページ
        }
      })
    })
  })

  const blogPostPerpage = 3 //１ページに表示する記事の数
  const blogPosts = res.data.allContentfulCode.edges.length //記事の総数
  const blogPages = Math.ceil(blogPosts / blogPostPerpage) //記事一覧ページの総数

  Array.from({ length: blogPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}/`,
      component: blogTemplate,
      context: {
        skip: blogPostPerpage * i,
        limit: blogPostPerpage,
        currentPage: i + 1, // 現在のページ番号
        isFirst: i + 1 === 1, //最初のページ
        isLast: i + 1 === blogPages, // 最後のページ
      }
    })
  })
}