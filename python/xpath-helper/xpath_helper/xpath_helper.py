from typing import List, Optional
from xpath_helper.filter import ValidExpressionFilter

"""
XPathHelper provides a simple and chainnable API to build complicated XPath queries without the hassle.
After building your XPath query, pass it to the <code>str</code> method  to get the corresponding XPath string.
"""
class XPathHelper:
    
    sb: List[str] = []

    def __init__(self, currentPath: Optional[List[str]]=None):
        """Creates an instance of XPathHelper.

        Args:
            currentPath (list[string]): Current path
        """
        if (currentPath != None):
            self.sb = currentPath

        else:
            self.__append_local_path()

    def empty(self):
        """Empties the current path.
        """
        self.sb = []
        self.__append_local_path()

    def __str__(self) -> str:
        """Returns the corresponding Xpath query.

        Returns:
            str: the string of the corresponding XPath query
        """
        return "".join(self.sb)

    ############## General commands ##############

    def get_parent(self) -> 'XPathHelper' :
        """Selects the parent of the current element.

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/.."])

    def get_element_by_xpath(self, xpath : str) -> 'XPathHelper' :
        """Selects an element with an XPath selector <code>xpath</code>.

        Args:
            xpath (str): [description]

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + [xpath])

    ############## Descendant axis ##############
    # The descendant axis retrieves all nodes below the node in reference no matter the depth.
    #############################################

    def get_descendant(self, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Selects the nodes filtered by <code>filter</code>, below the node in reference no matter the depth.

        Args:
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["//*" + self.__compute_filter(filter)])

    def get_element(self, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Selects the nodes filtered by <code>filter</code>, below the node in reference no matter the depth.
        This self method is a synonym of <code>get_descendant</code>.

        Args:
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return self.get_descendant(filter)

    def get_descendant_by_tag(self, tag: str, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Selects the nodes with tag <code>tag</code> filtered by <code>filter</code>, below the node in reference no matter the depth.

        Args:
            tag (str): tag name
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["//" + tag + self.__compute_filter(filter)])

    def get_element_by_tag(self, tag: str, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Selects the nodes with tag <code>tag</code> filtered by <code>filter</code>, below the node in reference no matter the depth.
        This method is a synonym of <code>get_descendant_by_tag</code>.

        Args:
            tag (str): tag name
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return self.get_descendant_by_tag(tag, filter)

    def get_descendant_by_svg_tag(self, svg_tag: str, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper':
        """Selects the SVG nodes with SVG tag <code>svg_tag</code> filtered by <code>filter</code>, below the node in reference no matter the depth.

        Args:
            svg_tag (str): SVG tag name
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["//*[local-name() = '" + svg_tag + "']" + self.__compute_filter(filter)])

    def get_element_by_svg_tag(self, svg_tag: str, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper':
        """Selects the SVG nodes with SVG tag <code>svg_tag</code> filtered by <code>filter</code>, below the node in reference no matter the depth.
       This method is a synonym of <code>get_descendant_by_svg_tag</code>.

        Args:
            svg_tag (str): SVG tag name
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return self.get_descendant_by_svg_tag(svg_tag, filter)

    ############## Descendant-or-self axis ##############
    # The descendant-or-self axis returns all nodes below the current node,
    # but also returns the node in reference.
    ####################################################

    def get_descendant_or_self(self, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Selects the nodes filtered by <code>filter</code>, below the current node, but also returns the node in reference.

        Args:
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/descendant-or-self::*" + self.__compute_filter(filter)])

    def get_descendant_or_self_by_tag(self, tag: str, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Selects the nodes with tag <code>tag</code> filtered by <code>filter</code>, below the current node, but also returns the node in reference.

        Args:
            tag (str): tag name
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/descendant-or-self::" + tag + "" + self.__compute_filter(filter)])

    def get_descendant_or_self_by_svg_tag(self, svg_tag: str, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper':
        """Selects the SVG nodes with SVG tag <code>svg_tag</code> filtered by <code>filter</code>, below the current node, but also returns the node in reference.

        Args:
            svg_tag (str): SVG tag name
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/descendant-or-self::*[local-name() = '" +
                                      svg_tag +
                                      "']" +
                                      self.__compute_filter(filter)])

    ############## Child axis ##############
    # The child axis returns the nodes immediately below the node in reference.
    #######################################

    def get_child(self, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Selects the nodes filtered by <code>filter</code> immediately below the node in reference.

        Args:
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/*" + self.__compute_filter(filter)])

    def get_child_by_tag(self, tag: str, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Selects the nodes with tag <code>tag</code> filtered by <code>filter</code>, immediately below the node in reference.

        Args:
            tag (str): tag name
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/" + tag + "" + self.__compute_filter(filter)])

    def get_child_by_svg_tag(self, svg_tag: str, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper':
        """Selects the SVG nodes with SVG tag <code>svg_tag</code> filtered by <code>filter</code>, immediately below the node in reference.

        Args:
            svg_tag (str): SVG tag name
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/*[local-name() = '" + svg_tag + "']" + self.__compute_filter(filter)])

    ############## Ancestor axis ##############
    # The ancestor axis returns all the nodes that are ancestors,
    # or the parent, and the parent's parent, and so on, to the node in reference.
    ###########################################

    def get_ancestor(self, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Selects the nodes filtered by <code>filter</code>,
        that are ancestors, or the parent, and the parent's parent, and so on, to the node in reference.

        Args:
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/ancestor::*" + self.__compute_filter(filter)])

    def get_ancestor_by_tag(self, tag: str, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Selects the nodes with tag <code>tag</code> filtered by <code>filter</code>,
        that are ancestors, or the parent, and the parent's parent, and so on, to the node in reference.

        Args:
            tag (str): tag name
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/ancestor::" + tag + "" + self.__compute_filter(filter)])

    def get_ancestor_by_svg_tag(self, svg_tag: str, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper':
        """Selects the SVG nodes with SVG tag <code>svg_tag</code> filtered by <code>filter</code>,
        that are ancestors, or the parent, and the parent's parent, and so on, to the node in reference.

        Args:
            svg_tag (str): SVG tag name
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/ancestor::*[local-name() = '" +
                                      svg_tag +
                                      "']" +
                                      self.__compute_filter(filter)])

    ############## Ancestor-or-self axis ##############
    # The ancestor-or-self axis returns all nodes that are ancestors,
    # or the parent, and the parent's parent, and so on, including the node in reference.
    ##############******##############

    def get_ancestor_or_self(self, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Selects the nodes filtered by <code>filter</code>,
        that are ancestors, or the parent, and the parent's parent, and so on, including the node in reference.

        Args:
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/ancestor-or-self::*" + self.__compute_filter(filter)])

    def get_ancestor_or_self_by_tag(self, tag: str, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Selects the nodes with tag <code>tag</code> filtered by <code>filter</code>,
        that are ancestors, or the parent, and the parent's parent, and so on, including the node in reference.

        Args:
            tag (str): tag name
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/ancestor-or-self::" + tag + "" + self.__compute_filter(filter)])

    def get_ancestor_or_self_by_svg_tag(self, svg_tag: str, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper':
        """Selects the SVG nodes with SVG tag <code>svg_tag</code> filtered by <code>filter</code>,
        that are ancestors, or the parent, and the parent's parent, and so on, including the node in reference.

        Args:
            svg_tag (str): SVG tag name
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/ancestor-or-self::*[local-name() = '" +
                                      svg_tag +
                                      "']" +
                                      self.__compute_filter(filter)])

    ############## Following axis ##############
    # The following axis selects all nodes no matter the depth, that are located on parent-level
    # and also after (following) its parent of the node in reference.
    ############################################

    def get_following(self, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Selects the nodes filtered by <code>filter</code>, that are located on parent-level
        and also after (following) its parent of the node in reference.

        Args:
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/following::*" + self.__compute_filter(filter)])

    def get_following_by_tag(self, tag: str, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Selects the nodes with tag <code>tag</code> filtered by <code>filter</code>,
        that are located on parent-level and also after (following) its parent of the node in reference.

        Args:
            tag (str): tag name
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/following::" + tag + "" + self.__compute_filter(filter)])

    def get_following_by_svg_tag(self, svg_tag: str, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper':
        """Selects the SVG nodes with SVG tag <code>svg_tag</code> filtered by <code>filter</code>,
        that are located on parent-level and also after (following) its parent of the node in reference.

        Args:
            svg_tag (str): SVG tag name
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/following::*[local-name() = '" +
                                      svg_tag +
                                      "']" +
                                      self.__compute_filter(filter)])

    ############## Following-sibling axis ##############
    # The following-sibling axis selects all nodes that are located on the same level who are located after (following) the node in reference.
    ####################################################

    def get_following_sibling(self, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Selects the nodes filtered by <code>filter</code>,
        that are located on the same level who are located after (following) the node in reference.

        Args:
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/following-sibling::*" + self.__compute_filter(filter)])

    def get_following_sibling_by_tag(self, tag: str, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Selects the nodes with tag <code>tag</code> filtered by <code>filter</code>,
        that are located on the same level who are located after (following) the node in reference.

        Args:
            tag (str): tag name
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/following-sibling::" + tag + "" + self.__compute_filter(filter)])

    def get_following_sibling_by_svg_tag(self, svg_tag: str, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper':
        """Selects the SVG nodes with SVG tag <code>svg_tag</code> filtered by <code>filter</code>,
        that are located on the same level who are located after (following) the node in reference.

        Args:
            svg_tag (str): SVG tag name
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/following-sibling::*[local-name() = '" +
                                      svg_tag +
                                      "']" +
                                      self.__compute_filter(filter)])

    ############## Preceding axis ##############
    # The preceding axis selects all nodes no matter the depth,
    # that are located on parent-level and also before (preceding) its parent of the node in reference.
    ############################################

    def get_preceding(self, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Selects the nodes filtered by <code>filter</code>, that are located on parent-level
        and also before (preceding) its parent of the node in reference.

        Args:
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/preceding::*" + self.__compute_filter(filter)])

    def get_preceding_by_tag(self, tag: str, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Selects the nodes with tag <code>tag</code> filtered by <code>filter</code>,
        that are located on parent-level and also before (preceding) its parent of the node in reference.

        Args:
            tag (str): tag name
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/preceding::" + tag + "" + self.__compute_filter(filter)])

    def get_preceding_by_svg_tag(self, svg_tag: str, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper':
        """Selects the SVG nodes with SVG tag <code>svg_tag</code> filtered by <code>filter</code>,
        that are located on parent-level and also before (preceding) its parent of the node in reference.

        Args:
            svg_tag (str): SVG tag name
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/preceding::*[local-name() = '" +
                                      svg_tag +
                                      "']" +
                                      self.__compute_filter(filter)])

    ############## Preceding-sibling axis ##############
    # The preceding axis selects all nodes that are located on the same level
    # who are also located before (preceding) the node in reference.
    ##############*******##############

    def get_preceding_sibling(self, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Selects the nodes filtered by <code>filter</code>, that are located on the same level
        who are also located before (preceding) the node in reference.

        Args:
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/preceding-sibling::*" + self.__compute_filter(filter)])

    def get_preceding_sibling_by_tag(self, tag: str, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Selects the nodes with tag <code>tag</code> filtered by <code>filter</code>,
        that are located on the same level who are also located before (preceding) the node in reference.

        Args:
            tag (string): [description]
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/preceding-sibling::" + tag + "" + self.__compute_filter(filter)])

    def get_preceding_sibling_by_svg_tag(self, svg_tag: str, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper':
        """Selects the SVG nodes with SVG tag <code>svg_tag</code> filtered by <code>filter</code>,
        that are located on the same level who are also located before (preceding) the node in reference.

        Args:
            svg_tag (str): SVG tag name
            filter (Filter): filter to apply

        Returns:
            XPathHelper: a new instance of XPathHelper
        """
        return XPathHelper(self.sb + ["/preceding-sibling::*[local-name() = '" +
                                      svg_tag +
                                      "']" +
                                      self.__compute_filter(filter)])

    def __append_local_path(self):
        """Adds the local path.

        Returns:
            XPathHelper: an instance of XPathHelper with the local path appened.
        """
        return XPathHelper(self.sb + ["."])

    def __compute_filter(self, filter: Optional[ValidExpressionFilter]=None) -> 'XPathHelper' :
        """Adds the given filter to the current xpath expression.

        Args:
            filter (Filter): filter to apply

        Returns:
            str: filter as an XPath string
        """
        suffix = ""
        if (filter != None and not filter.is_empty()):
            expression = str(filter)
            suffix = "[" + expression + "]"

        return suffix