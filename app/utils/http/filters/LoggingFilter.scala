package utils.http.filters

import scala.concurrent.{ExecutionContext, Future}

import javax.inject.Inject

import play.api.mvc.{Filter, RequestHeader, Result}

import akka.stream.Materializer
import com.typesafe.scalalogging.Logger
import org.slf4j.LoggerFactory

class LoggingFilter @Inject()(
    implicit val mat: Materializer,
    implicit val ec: ExecutionContext
) extends Filter {
    private val logger = Logger(LoggerFactory.getLogger("server.LoggingFilter"))

    override def apply(nextFilter: RequestHeader => Future[Result])(requestHeader: RequestHeader): Future[Result] = {
        val startTime = System.currentTimeMillis

        nextFilter(requestHeader).map { result =>
            val endTime = System.currentTimeMillis
            val requestTime = endTime - startTime

            logger.info(
                s"${requestHeader.method} ${requestHeader.uri} -> duration: ${requestTime}ms, status: ${result.header.status}"
            )

            result.withHeaders("Request-Time" -> requestTime.toString)
        }
    }
}
