
package zoogle.restControlers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import zoogle.dao.UserDao;
import zoogle.model.User;
import zoogle.security.UserDetails;
import zoogle.service.UserService;

@RestController
@PreAuthorize("hasRole('ROLE_USER')")
@RequestMapping(value = "users")
public class UserControler {

    private final UserService usrServ;
    private final UserDao usrDao;

    @Autowired
    UserControler(UserService service, UserDao dao){
        usrServ = service;
        usrDao = dao;
    }

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<User> getUsers() {
        return usrServ.getPrintableUsers();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public User getUser(@PathVariable(value="id") Integer id) {
        User user = usrDao.find(id);
        if (user == null || !user.isActive()){
            throw new UsernameNotFoundException("User with this id does not exist");
        }
        return new User(user);
    }

    @RequestMapping(value = "/currentUser", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public User getThisUser() {
        User usr = usrServ.getCurrUser();
        return new User(usr);
    }

    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable(value="id") Integer id) {
        User user = usrDao.find(id);
        if (user == null || !user.isActive()){
            throw new UsernameNotFoundException("User with this id does not exist");
        }
        user.setActive(false);
        usrDao.update(user);
    }

    @Transactional
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public void editUser(
            @PathVariable(value="id") Integer id,
            @RequestBody User reqUser) {
        User user = usrDao.find(id);
        if (user == null || !user.isActive()){
            throw new UsernameNotFoundException("User with this id does not exist");
        }

        reqUser.setId(id);
        reqUser.setActive(user.isActive());

        if (reqUser.getFirstname() == null ){
            reqUser.setFirstname(user.getFirstname());
        }
        if (reqUser.getLastname() == null ){
            reqUser.setLastname(user.getLastname());
        }
        if (reqUser.getLogin() == null ){
            reqUser.setLogin(user.getLogin());
        }
        if (reqUser.getPass() == null ){
            reqUser.setPass(user.getPass());
            usrDao.update(reqUser);
        } else{
            usrServ.update(reqUser);
        }
    }
}