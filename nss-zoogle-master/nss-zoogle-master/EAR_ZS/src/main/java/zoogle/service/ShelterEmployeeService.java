package zoogle.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import zoogle.dao.ShelterEmployeeDao;
import zoogle.dao.UserDao;
import zoogle.model.ShelterEmployee;
import zoogle.model.Shelter;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Service
public class ShelterEmployeeService {
    @PersistenceContext
    private EntityManager em;

    private final ShelterEmployeeDao dao;

    @Autowired
    public ShelterEmployeeService(ShelterEmployeeDao dao) {
        this.dao = dao;
    }

    @Transactional
    public List<ShelterEmployee> getRequests(Shelter shel) {
        em.flush();
        List<ShelterEmployee> shels = new ArrayList();

        for (ShelterEmployee s : dao.findByShelter(shel)){

            shels.add(s);

        }
        return shels;
    }
}
