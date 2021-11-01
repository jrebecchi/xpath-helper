__version__ = '0.1.0'
__all__ = ['xh', 'filter', 'XPathHelper', 'EmptyFilter']

from xpath_helper.filter import EmptyFilter
from xpath_helper.xpath_helper import XPathHelper
filter = EmptyFilter()
xh = XPathHelper()

