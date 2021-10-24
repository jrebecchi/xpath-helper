"""
The following Filter classes provide a simple, chainable and decomposable api
to create XPath filter expression
"""

import functools

"""
Shortcut to design any attribute name
"""
ANY_ATTRIBUTE = "*"


"""
XPath Filter containing a valid expression.
"""
class FilledFilter:
    sb = []

    def __init__(self, current_path = None):
        """Creates an instance of FilledFilter.

        Args:
            currentPath (list[string]): Current filter path
        """
        if (current_path != None):
            self.sb = current_path 
    
    def and_condition(self, *filters):
        """Adds one or more filter expression to the current one with the AND logical operator.

        Args:
            filters (list[Filter]): List of filters List of filters that will be added with the AND logical operator

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """        
        expression = ""
        if (len(self.sb) != 0):
            expression += " and "
        
        expression += "("
        expression += functools.reduce(lambda acc, filter: acc + add_openrand(filter, " and ", filter == filters[-1]), filters, "")
        expression += ")"
        return FilledFilter(self.sb + [expression])
    
    def or_condition(self, *filters):
        """Adds one or more filter expression to the current one with the OR logical operator.

        Args:
            filters (list[Filter]): List of filters that will be added with the OR logical operator

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """        
        expression = ""
        if (len(self.sb) != 0):
            expression += " or "
        
        expression += "("
        expression += functools.reduce(lambda acc, filter: acc + add_openrand(filter, " or ", filter == filters[-1]), filters, "")
        expression += ")"
        return FilledFilter(self.sb + [expression])
       
    def __str__(self):
        """Returns the Filter as a valid XPath filter expression.

        Returns:
            str: the string of the corresponding XPath filter
        """        
        return "".join(self.sb)
    
    
    def empty(self):
        """Empties the current path.
        """        
        self.sb = []
    
    def is_empty(self):
        """Returns true if filter is empty.

        Returns:
            bool: true if filter is empty
        """        
        return len(self.sb) == 0
    

"""
Empty XPath filter.
"""
class Filter(FilledFilter):
    def __init__(self, currentPath = None):
        """Creates an instance of Filter.

        Args:
            currentPath (list[string]): Current filter path
        """        
        super().__init__(currentPath)
    
    
    def has_attribute(self, attribute: str):
        """Selects the nodes that have the attribute <code>attribute</code>.

        Args:
            attribute (str): attribute name

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """        
        return FilledFilter(self.sb + ["@" + attribute]);
    
    def attribute_contains(self, attribute, value):
        """Selects the nodes with the attribute <code>attribute</code> containing the value <code><value</code>.

        Args:
            attribute (str): attribute name
            value (str): attribute value

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """        
        return FilledFilter(self.sb + ["contains(@" + attribute + ", " + replace_apostrophes(value) + ")",
        ]);

    def attribute_equals(self, attribute, value):
        """Selects the nodes with the attribute <code>attribute</code>, whose value equals <code><value</code>.

        Args:
            attribute (str): attribute name
            value (str | int | float): attribute value

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """        
        return FilledFilter(self.sb + ["@" + attribute + "=" + replace_apostrophes(value) + "",
        ]);

    def attribute_not_equals(self, attribute, value):
        """Selects the nodes with the attribute <code>attribute</code>, whose value doesn't equal <code><value</code>.

        Args:
            attribute (str): attribute name
            value (str | int | float): attribute value

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """        
        return FilledFilter(self.sb + ["@" + attribute + "!=" + replace_apostrophes(value)]);
    
    def attribute_less_than(self, attribute, value):
        """Selects the nodes with the attribute <code>attribute</code>, whose value is less than <code><value<code>.

        Args:
            attribute (str): attribute name
            value (int | float): attribute value

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """        
        return FilledFilter(self.sb + ["@" + attribute + "<" + value]);
    
    def attribute_less_than_or_equal_to(self, attribute, value):
        """Selects the nodes with the attribute <code>attribute</code>, whose value is less than or equal to <code><value</code>.

        Args:
            attribute (str): attribute name
            value (int | float): attribute value

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """        
        return FilledFilter(self.sb + ["@" + attribute + "<=" + value]);
    
    def attribute_greater_than(self, attribute, value):
        """Selects the nodes with the attribute <code>attribute</code>, whose value is greater than <code><value</code>.

        Args:
            attribute (str): attribute name
            value (int | float): attribute value

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """        
        return FilledFilter(self.sb + ["@" + attribute + ">" + value]);
    
    def attribute_greater_than_or_equal_to(self, attribute, value):
        """Selects the nodes with the attribute <code>attribute</code>, whose value is greater than or equal to <code><value</code>.

        Args:
            attribute (str): attribute name
            value (int | float): attribute value

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """        
        return FilledFilter(self.sb + ["@" + attribute + ">=" + value]);

    def value_contains(self, value):
        """Selects the nodes containing the value <code><value</code>.

        Args:
            value (str): value

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """
        return FilledFilter(self.sb + ["text()[contains(., " + replace_apostrophes(value) + ")]"]);

    def value_equals(self, value):
        """Selects the nodes whose value equals <code><value</code>.

        Args:
            value (str | int | float): value

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """        
        return FilledFilter(self.sb + ["text() = " + replace_apostrophes(value)]);
    
    def value_not_equals(self, value):
        """Selects the nodes with whose value doesn't equal <code><value</code>.

        Args:
            value (str | int | float): value

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """        
        return FilledFilter(self.sb + ["text() !=" + replace_apostrophes(value)]);
    
    def value_less_than(self, value):
        """Selects the nodes whose value is less than <code><value</code>.

        Args:
            value (int | float): value

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """        
        return FilledFilter(self.sb + ["text() <" + value]);
    
    def value_less_than_or_equal_to(self, value):
        """Selects the nodes whose value is less than or equal to <code><value</code>.

        Args:
            value (int | float): value

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """        
        return FilledFilter(self.sb + ["text() <=" + value]);

    def value_greater_than(self, value):
        """Selects the nodes  whose value is greater than <code><value</code>.

        Args:
            value (int | float): value

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """        
        return FilledFilter(self.sb + ["text() >" + value]);
    
    def value_greater_than_or_equal_to(self, value):
        """Selects the nodes whose value is greater than or equal to <code><value</code>.

        Args:
            value (int | float): value

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """        
        return FilledFilter(self.sb + ["text() >=" + value]);
    
    def get(self, index):
        """Selects the node element who is positioned at the <code>index</code> position in its parent children list.

        Args:
            index (int): index of the element in the list

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """        
        return FilledFilter(self.sb + ["" + index]);

    def get_first(self):
        """Selects the node element who is positioned first in its parent children list.

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """
        return FilledFilter(self.sb + ["1"]);
    

    def get_last(self):
        """Selects the node element who is positioned last in its parent children list.

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """        
        return FilledFilter(self.sb + ["last()"]);
    
    def not_expression(self, filter):
        """Reverses the filter <code>filter</code>. Returns true when the filter returns false and true when the filter returns false.

        Args:
            filter ([type]): [description]

        Returns:
            FilledFilter: a new instance of FilledFilter with the newly formed expression.
        """        
        return FilledFilter(self.sb + ["not( " + add_openrand(filter) + " )"]);
    


def add_openrand(filter : Filter, separator = "", is_last = True):
    """Adds operand between filters

    Args:
        filter (Filter): a filter
        separator (str, optional): " and " of " or " separator. Defaults to "".
        isLast (bool, optional): True if it is the last operand. Defaults to True.

    Returns:
        str: opperand with and / or separator
    """    
    suffix = ""
    if filter and not filter.is_empty():
        expression = filter.toString()
        suffix = expression
        if not is_last:
            suffix += separator
    return suffix

def replace_apostrophes(input):
    """Treats the presence of apostrophes so it doesn't break the XPath filter expression.

    Args:
        input (str | int): input

    Returns:
        str: XPath filter expression with apostrophes handled.
    """    
    if not isinstance(input, str):
        return input

    if "'" in input:
        prefix = ""
        elements = input.split("'")
        output = "concat("
        for s in elements:
            output += prefix + "'" + s + "'"
            prefix = ',"\'",'

        if output.endsWith(","):
            output = output.substring(0, len(output) - 2)

        output += ")"
        return output

    else:
        return "'" + input + "'"
    
