package utils.auth

import play.api.mvc.Cookie

import com.typesafe.config.Config
import net.ceedubs.ficus.readers.ValueReader

trait CookieReader {
    implicit val sameSiteReader: ValueReader[Option[Option[Cookie.SameSite]]] =
        (config: Config, path: String) => {
            if (config.hasPathOrNull(path)) {
                if (config.getIsNull(path))
                    Some(None)
                else {
                    Some(Cookie.SameSite.parse(config.getString(path)))
                }
            } else {
                None
            }
        }
}

object CookieReader extends CookieReader