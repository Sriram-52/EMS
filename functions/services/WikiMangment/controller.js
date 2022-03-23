const { json } = require("express")
const express = require("express")
const router = express.Router()
const { closedEnd } = require("../../endpoints")
const { start_letter_to_upper_case } = require("../../providers/CustomJSutils")
const { params_validator } = require("../../providers/Validator")
const WikiMangment = require("./model")
const WikiManagmentUTILS = require("./utils")

router.post(
  "/newarticle/:categoryId",
  params_validator,
  closedEnd,
  async (req, res) => {
    const wikiManagmentObj = new WikiMangment(req.user)
    const { categoryId } = req.params
    const inputs = WikiManagmentUTILS._acceptable_inputs_article(req.body)
    try {
      await wikiManagmentObj.newArticle(categoryId, inputs)
      return res.status(200).json({ message: `Article added successfully` })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ message: `Failed to add article` })
    }
  }
)

router.put(
  "/updatearticle/:articleId/:categoryId",
  params_validator,
  closedEnd,
  async (req, res) => {
    const { categoryId, articleId } = req.params
    const wikiManagmentObj = new WikiMangment(req.user)
    const inputs = WikiManagmentUTILS._acceptable_inputs_article(req.body)
    try {
      await wikiManagmentObj.updateArticle(articleId, categoryId, inputs)
      return res.status(200).json({ message: `Article updated successfully` })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: `Failed to update article` })
    }
  }
)

router.put(
  "/restorearticle/:articleId/:categoryId",
  params_validator,
  closedEnd,
  async (req, res) => {
    const { articleId, categoryId} = req.params
    const wikiManagmentObj = new WikiMangment(req.user)
    try {
      await wikiManagmentObj.restoreArticle(articleId, categoryId)
      return res.status(200).json({ message: `Article restored successfully` })
    } catch (error) {
      console.error(error)
      
      if (error.toString().match("article-exists"))
        return res
          .status(501)
          .json({ message: `Article already exists cannot restore` })
      
      if (error.toString().match("no-meta-info"))
        return res.status(502).json({ message: `Something went wrong!` })
      
      if (error.toString().match("no-category-exists"))
        return res.status(503).json({ message: `No category exists to restore the article`})
    
      return res.status(500).json({ message: `Failed to restore article ` })
    }
  }
)

router.delete(
  "/deletearticle/:articleId",
  params_validator,
  closedEnd,
  async (req, res) => {
    const { articleId } = req.params
    const wikiManagmentObj = new WikiMangment(req.user)
    try {
      await wikiManagmentObj.deleteArticle(articleId)
      return res.status(200).json({ message: `Article deleted successfully` })
    } catch (error) {
      console.error(error)
      if (error.toString().match("no-article-exists"))
        return res.status(401).json({ message: `Article already deleted` })
      return res.status(500).json({ message: `Failed to delete article ` })
    }
  }
)

router.post("/newCategory", closedEnd, async (req, res) => {
  const wikiManagmentObj = new WikiMangment(req.user)
  const inputs = WikiManagmentUTILS._acceptable_inputs_category(req.body)
  try {
    await wikiManagmentObj.newCategory(inputs)
    return res.status(200).json({ message: `Category added successfully` })
  } catch (err) {
    console.error(err)
    if (err.toString().match("category-already-exists"))
      return res
        .status(501)
        .json({ message: `A category with the same name already exists` })
    return res.status(500).json({ message: `Failed to add category` })
  }
})

router.put(
  "/updateCategory/:categoryId",
  params_validator,
  closedEnd,
  async (req, res) => {
    const wikiManagmentObj = new WikiMangment(req.user)
    const { categoryId } = req.params
    const inputs = WikiManagmentUTILS._acceptable_inputs_category(req.body)
    try {
      await wikiManagmentObj.updateCategory(categoryId, inputs)
      return res.status(200).json({ message: `Category updated successfully` })
    } catch (err) {
      console.error(err)
      if (err.toString().match("category-already-exists"))
        return res
          .status(501)
          .json({ message: `A category with the same name already exists` })
      return res.status(500).json({ message: `Failed to update category` })
    }
  }
)

router.delete(
  "/deleteCategory/:categoryId",
  params_validator,
  closedEnd,
  async (req, res) => {
    const wikiManagmentObj = new WikiMangment(req.user)
    const { categoryId } = req.params
    try {
      await wikiManagmentObj.deleteCategory(categoryId)
      return res.status(200).json({ message: `Category deleted successfully` })
    } catch (err) {
      console.error(err)
      if (err.toString().match("category-already-deleted"))
        return res.status(501).json({ message: `Already deleted` })
      return res.status(500).json({ message: `Failed to delete category` })
    }
  }
)

router.post(
  "/newcomment/:articleId",
  params_validator,
  closedEnd,
  async (req, res) => {
    const wikiManagmentObj = new WikiMangment(req.user)
    const { articleId } = req.params
    const inputs = WikiManagmentUTILS._acceptable_inputs_comment(req.body)
    try {
      await wikiManagmentObj.newcommentOnWikiArticle(articleId, inputs)
      return res.status(200).json({ message: `Commented successfully` })
    } catch (error) {
      if (error.toString().match("no-article-exists"))
        return res
          .status(404)
          .json({ message: `No article exists to comment on it` })
      return res.status(500).json({ message: `Failed to add comment` })
    }
  }
)

router.put(
  "/updatecomment/:articleId/:commentId",
  params_validator,
  closedEnd,
  async (req, res) => {
    const wikiManagmentObj = new WikiMangment(req.user)
    const { articleId, commentId } = req.params
    const inputs = WikiManagmentUTILS._acceptable_inputs_comment(req.body)
    try {
      await wikiManagmentObj.updateComment(commentId, articleId, inputs)
      return res.status(200).json({ message: `Commente updated successfully` })
    } catch (error) {
      if (error.toString().match("no-article-exists"))
        return res
          .status(404)
          .json({ message: `No article exists to update comment` })
      if (error.toString().match("no-comment-exists"))
        return res.status(403).json({ message: `No comment found to update` })
      return res.status(500).json({ message: `Failed to update comment` })
    }
  }
)

router.delete(
  "/deletecomment/:articleId/:commentId",
  params_validator,
  closedEnd,
  async (req, res) => {
    const wikiManagmentObj = new WikiMangment(req.user)
    const { articleId, commentId } = req.params
    try {
      await wikiManagmentObj.deleteComment(commentId, articleId)
      return res.status(200).json({ message: `Commented deleted successfully` })
    } catch (error) {
      console.error(error)
      if (error.toString().match("no-article-exists"))
        return res
          .status(404)
          .json({ message: `No article exists to delete comment` })
      if (error.toString().match("no-comment-exists"))
        return res.status(403).json({
          message: `No comment found to delete / Comment already deleted`,
        })
      return res.status(500).json({ message: `Failed to delete comment` })
    }
  }
)

router.put(
  "/voteForWikiArticle/:articleId/:type",
  params_validator,
  closedEnd,
  async (req, res) => {
    const wikiManagmentObj = new WikiMangment(req.user)
    const { articleId, type } = req.params
    try {
      await wikiManagmentObj.upVoteOrdownVoteArticle(articleId, type)
      return res.status(200).json({
        message: `Voted successfully`,
      })
    } catch (error) {
      console.error(error)
      if (error.toString().match("no-article-exists"))
        return res.status(404).json({ message: `No article exists to vote` })
      return res.status(500).json({ message: `Failed to vote` })
    }
  }
)

router.put(
  "/followOrunFollowArticle/:articleId/:type",
  params_validator,
  closedEnd,
  async (req, res) => {
    const wikiManagmentObj = new WikiMangment(req.user)
    const { articleId, type } = req.params
    try {
      await wikiManagmentObj.followOrunFollowArticle(articleId, type)
      return res.status(200).json({
        message: `${start_letter_to_upper_case(type)}ed successfully`,
      })
    } catch (error) {
      console.error(error)
      if (error.toString().match("no-article-exists"))
        return res.status(404).json({ message: `No article exists to ${type}` })
      return res.status(500).json({ message: `Failed to ${type}` })
    }
  }
)

module.exports = router
