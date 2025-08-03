import ContentWrapper from "@/components/ContentWrapper";
import Image from "next/image";
import Link from "next/link";

export default function DeliveryPage() {
  return (
    <ContentWrapper>
      <div className="relative min-h-[60vh] px-4 md:px-[50px] lg:px-[100px] py-[30px] flex flex-col gap-8 bg-white">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-[350px] flex-shrink-0">
            <div className="relative w-full h-56 md:h-[300px]">
              <Image
                src="/services_picture.png"
                alt="Доставка"
                fill={false}
                width={800}
                height={800}
                className="rounded-xl object-cover w-full h-full"
                style={{ width: "100%", height: "100%" }}
                priority
              />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl mb-4">
              Доставка
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              <span className="font-bold">Бережная доставка — вовремя и аккуратно</span>
              <br />
              Мы организуем доставку мебели в удобное для вас время. Наши специалисты аккуратно транспортируют изделия, чтобы они прибыли в целости и сохранности, независимо от сложности маршрута.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              <span className="font-bold">Всё под контролем</span>
              <br />
              Мы заранее согласуем дату и время, а также предоставим всю необходимую информацию по доставке. Вы всегда будете знать, когда ожидать свою новую мебель.
            </p>
          </div>
        </div>
        {/* CTA Section */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-gradient-to-r from-mainPurple to-mainPurple/80 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 text-white shadow-xl">
            <h3 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4">
              Остались вопросы по доставке?
            </h3>
            <p className="text-sm sm:text-base lg:text-lg opacity-90 leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами — мы подробно расскажем о сроках, стоимости и условиях доставки, а также поможем организовать всё максимально удобно для вас!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link
                href="/catalog"
                className="bg-white text-mainPurple px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto"
              >
                Смотреть каталог
              </Link>
              <Link
                href="/contacts"
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white hover:text-mainPurple transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto"
              >
                Связаться с нами
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}