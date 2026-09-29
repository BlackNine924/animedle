import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Se estiver voltando para a Home com scroll salvo em sessionStorage, não reseta para o topo
    if (pathname === '/' && sessionStorage.getItem('animedle_home_scroll') !== null) {
      return;
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });
  }, [pathname]);

  return null;
};
