package dao;

import zoogle.config.PersistenceConfig;
import org.junit.Ignore;
import org.junit.runner.RunWith;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

@Ignore
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {PersistenceConfig.class})
@Transactional(transactionManager = "txManager")
@EnableAspectJAutoProxy(proxyTargetClass = true)
@EnableTransactionManagement
public class BaseDaoTests {
    
}
