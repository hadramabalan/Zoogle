package zoogle.restControlers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import zoogle.dao.AdvertDao;
import zoogle.dao.UserDao;
import zoogle.model.Advert;
import zoogle.model.Comment;
import zoogle.model.User;
import zoogle.service.CommentService;
import zoogle.service.UserService;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("ads")
public class CommentController {
    private final CommentService commentService;
    private final UserDao userDao;
    private final AdvertDao advertSer;
    private final UserService usrServ;

    @RequestMapping(value = "/{id}/comments", method = GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Comment> findCommentByUser(@PathVariable("id") Integer id) {
        Advert advert = advertSer.find(id);
        return commentService.findByCommentsByAdvert(advert);
    }

    @RequestMapping(value = "/{id}/comments", method = RequestMethod.POST)
    public void postComment(
        @PathVariable("id") Integer id,
        @RequestParam(value="comment") String comment) {
        Advert advert = advertSer.find(id);
        User user = usrServ.getCurrUser();
        this.commentService.addComment(comment, user, advert);
    }

    @Autowired
    public CommentController(CommentService commentService, UserDao userDao, AdvertDao advertSer, UserService usrServ) {
        this.commentService = commentService;
        this.userDao = userDao;
        this.advertSer = advertSer;
        this.usrServ = usrServ;
    }
    /*

    @Filip Sváček to id je id te reklamy

    post by mel byt taky na ads/id/comments

ted mame dva posty na /ads

a otestuj prosim v postmanovi, ze to funguje

    /ads/{adId}/comments:
    get:
      tags:
      - everyone
      summary: "returns comments belonging to the ad"
    post:
    tags:
      - users
    summary: "creates a comment for the add"
*/


}
