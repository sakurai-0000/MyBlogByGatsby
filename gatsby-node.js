const path = require('path')

module.exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const blogDetail = path.resolve('./src/template/blogDetail.js')
  const codeTemplate = path.resolve('./src/template/codeTemplate.js')
  const archiveTemplate = path.resolve('./src/template/archiveTemplate.js')
  const res = await graphql(`
    query{
      allContentfulCode(sort: {fields: createdDate, order: DESC}) {
        edges {
          node {
            id
            slug
            category {
              category
              categorySlug
            }
            createdDate
          }
          next {
            title
            slug
            category {
              category
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

  // Code記事詳細ページ生成 //
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

  // CodeCategoryページ生成 //
  res.data.allContentfulCategory.edges.forEach(({ node }) => {
    const codePostPerpage = 5 //１ページに表示する記事の数
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
          codeName: node.category.category,
          codeSlug: node.category.categorySlug,
          skip: codePostPerpage * i,
          limit: codePostPerpage,
          currentPage: i + 1, // 現在のページ番号
          isFirst: i + 1 === 1, //最初のページ
          isLast: i + 1 === codePages, // 最後のページ
        }
      })
    })
  })

  // archive //
  const archivePerpage = 5 //１ページに表示する記事の数
  const yearMonth = ['2020-07', '2020-08', '2020-09', '2020-10', '2020-11', '2020-12'];
  const archiveByMonth = yearMonth.map(x => {
    const obj = {};
    obj[x] = (res.data.allContentfulCode.edges.filter(y => y.node.createdDate.match(x))).length;
    return obj;
  });

  archiveByMonth.forEach((x) => {
    const archivePosts = x[Object.keys(x)] //記事の総数 
    if (archivePosts === 0) return;
    const archivePages = Math.ceil(archivePosts / archivePerpage) //記事一覧ページの総数
    const currentYear = Object.keys(x)[0].split('-')[0];
    const currentMonth = Object.keys(x)[0].split('-')[1];
    const nextMonth = Number(currentMonth) + 1 === 13 ? '01' : ('00' + String(Number(currentMonth) + 1)).slice(-2);
    const nextYear = (nextMonth === '01') ? String(Number(nextMonth) + 1) : currentYear;

    Array.from({ length: archivePages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/${currentYear}/${currentMonth}`
            : `/${currentYear}/${currentMonth}/${i + 1}/`,
        component: archiveTemplate,
        context: {
          currentYearMonth: currentYear + '-' + currentMonth,
          nextYearMonth: nextYear + '-' + nextMonth,
          currentYear,
          currentMonth,
          skip: archivePerpage * i,
          limit: archivePerpage,
          currentPage: i + 1, // 現在のページ番号
          isFirst: i + 1 === 1, //最初のページ
          isLast: i + 1 === archivePages, // 最後のページ
        }
      })
    })
  })
}