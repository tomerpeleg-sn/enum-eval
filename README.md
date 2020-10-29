Agnostic asynchronous validation

# Live examples
- [React.js](https://ludovicoforace.github.io/enum-eval-reactjs/)
- [KnockoutJS](https://ludovicoforace.github.io/enum-eval-knockoutjs/)

# Concept
The user shouldn't write more than an enumerated descriptor/s to validate values. The module will look at the provided patterns in the descriptor/s and trigger the related validation condition against each value.

### Get the array with errors:
Triggering the validation will return an array of objects containing the error enumerations and identifiers for each value. The enumeration property identifies the faulty value while the identifier refers to the row the value belongs to. If the identifier is not provided, the property is set to undefined.

![alt text](https://github.com/ludovicoforace/enum-eval/raw/master/src/common/images/errorArray.png "errorArray")

### Validate fields across multiple rows:
Some fields may need to be repeated across multiple rows. The identifier property allows to distinguish between those rows and spot which specific field is faulty. It's possible to use generateRowId() to assign an id to a row. Custom row generators are also allowed as far as the outputted identifier is a string or number.

Below an errorArray of a form having two rows representing repeating fields (quantity, weight, width, height) and two unique fields (name, email):

![alt text](https://github.com/ludovicoforace/enum-eval/raw/master/src/common/images/errorArrayIdentifier.png "errorArray identifier")

The look of a multi row validation would be something like this. Reddish fields highlight the faulty values:

![alt text](https://github.com/ludovicoforace/enum-eval/raw/master/src/common/images/multipleError.png "multiple errors")

### Toggle the faulty look:
Using toggleErrorClass(enumeration, errorArray, identifier?) is possible to return the class string 'error' in the view or viewModel and get instant validation over values.

![alt text](https://github.com/ludovicoforace/enum-eval/raw/master/src/common/images/errorString.png "errorString")

### Use preset Regex:
You can import patterns{} and use some preset Regular Expressions.

# Installation

```shell
$ npm install enum-eval --save
```

# Common uses

### Validate single descriptor:
```javascript
import { validate, patterns } from 'enum-eval';

validate({
  name: {
    value: name,
    pattern: /^[a-zA-Z]+$/
  },
  email: {
    value: email,
    pattern: patterns.email
  }
});
```

### Validate more than one descriptor:
```javascript
import { validate, patterns } from 'enum-eval';

const user = {
  name: {
    value: name,
    pattern: /^[a-zA-Z]+$/
  },
  email: {
    value: email,
    pattern: patterns.email
  }
}

const company = {
  companyName: {
    value: companyName,
    pattern: /^[a-zA-Z]+$/
  },
  companyPhone: {
    value: contacts,
    pattern: /^\d+$/
  }
}

validate(user, company);
```

### Validate a descriptor conditionally:
isExtraActive is a boolean value toggling from the user interaction with UI.

```javascript
import { validate, patterns } from 'enum-eval';

const vm = new ViewModel
const user = {
  name: {
    value: name,
    pattern: /^[a-zA-Z]+$/
  },
  email: {
    value: email,
    pattern: patterns.email
  }
}

const extra = {
  jobTitle: {
    value: jobTitle,
    pattern: /^[a-zA-Z]+$/
  },
  phone: {
    value: phone,
    pattern: /^\d+$/
  }
}

if(vm.isExtraActive) {
  validate(user, extra)
} else {
  validate(user)
}
```

### Validate descriptor with multiple rows:
In this case, the piece descriptor differs from usual descriptors. Because of its multiple row feature, we want it to be an array of arrays. Each array represents a row and each row contains objects representing fields.

```javascript
import { validate, patterns } from 'enum-eval';

const user = {
  name: {
    value: name,
    pattern: /^[a-zA-Z]+$/
  },
  email: {
    value: email,
    pattern: patterns.email
  }
}

const piece = someArray.map(i => [
  {
    enumeration: 'quantity',
    value: i.quantity,
    pattern: /^\d+$/,
    identifier: i.id
  },
  {
    enumeration: 'weight',
    value: i.weight,
    pattern: /^\d+$/,
    identifier: i.id
  },
  {
    enumeration: 'width',
    value: i.width,
    pattern: /^\d+$/,
    identifier: i.id
  },
  {
    enumeration: 'height',
    value: i.height,
    pattern: /^\d+$/,
    identifier: i.id
  }
]
)

validate(user, piece);
```

# Usage

### Validate text:
Value not to be an empty string
```javascript
'anyText': {
  value: text
}
```

Value to match the specified pattern
```javascript
2: {
  value: text,
  pattern: 'that one'
}
```

Value to match letters only
```javascript
firstname: {
  value: text,
  pattern: /^[a-zA-Z]+$/
}
```

### Validate email:
Value to match imported email regex
```javascript
import { patterns } from 'enum-eval';

email: {
  value: email,
  pattern: patterns.email
}
```

Value to match custom email regex
```javascript
'email': {
  value: email,
  pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
}
```

### Validate file inputs:
Allows only png, jpg, pdf file uploads
```javascript
5: {
  value: file1,
  pattern: ['png', 'jpg', 'pdf']
}
```

Allows all file extensions except exe
```javascript
file2: {
  value: file2,
  pattern: [['exe']]
}
```

Allows all files but not empty file
```javascript
'file3': {
  value: file3,
  elementType: 'all-files'
}
```

Custom FileObject (fileName has to be a string)
```javascript
file4: {
  value: () => ({ 0: { name: `${fileName}` } }),
  pattern: [['js']]
}
```

### Validate selectors:
Value to mismatch pattern

```javascript
'country': {
  value: selector,
  pattern: /^Select a country$/,
  elementType: 'select'
}
```

### Validate checkbox inputs:
Value to be true

```javascript
checkbox1: {
  value: checkbox1,
  pattern: true
}
```

Value to be false

```javascript
'checkbox2': {
  value: checkbox1,
  pattern: false
}
```

### Validate values across multiple rows:
*NB: In this case, we want to represent the descriptor with the enumeration property inside the literal and not outside as usual.*  
Values to be digits only

```javascript
const piece = someArray.map(i => [
  {
    enumeration: 'quantity',
    value: i.quantity,
    pattern: /^\d+$/,
    identifier: i.id
  },
  {
    enumeration: 'weight',
    value: i.weight,
    pattern: /^\d+$/,
    identifier: i.id
  },
  {
    enumeration: 'width',
    value: i.width,
    pattern: /^\d+$/,
    identifier: i.id
  },
  {
    enumeration: 'height',
    value: i.height,
    pattern: /^\d+$/,
    identifier: i.id
  }
]
)
```

### Validate fields optionally:
Value to match letters or to be empty
```javascript
jobTitle: {
  value: jobTitle,
  pattern: /^[a-zA-Z]+$/,
  optional: true
}
```

Value to match digits or to be empty
```javascript
phone: {
  value: phone,
  pattern: /^\d+$/,
  optional: true
}
```

Allow only pdf or no file
```javascript
'attachment': {
  value: attachment,
  pattern: ['pdf'],
  optional: true
}
```

### Toggle the 'error' string in the view:
toggleErrorClass() checks if the reference of a certain html element is contained in the errorArray and toggle a class named 'error'. Customise the error class to get the desired style in case of error

```jsx
import { toggleErrorClass } from 'enum-eval';

render() {
  return (
    <form>
      <input
        ref="file-upload"
        type="file"
        multiple
        onChange={this.update}
        className={toggleErrorClass(2, this.state.errors)}
      />
      <button onClick={this.submit}>Submit</button>
    </form>
  );
}
```

### Toggle the 'error' string in the view model:
Some javascript frameworks may make difficult to compute toggleErrorClass() directly in the view. In that case, compute toggleErrorClass() in the view model and then bind it to the view.

```javascript
import { toggleErrorClass } from 'enum-eval';

class ViewModel {
  @computed
  quantityError() {
    return toggleErrorClass('quantity', errorArray, rowId);
  }
  @computed
  weightError() {
    return toggleErrorClass('weight', errorArray, rowId);
  }
  @computed
  widthError() {
    return toggleErrorClass('width', errorArray, rowId);
  }
  @computed
  heightError() {
    return toggleErrorClass('height', errorArray, rowId);
  }
}
```

### Generate a row id:
It's possible to import generateRowId() to generate row ids. The ids will be the identifiers for fields which are repeated across multiple rows.

```javascript
import { generateRowId } from 'enum-eval';

function initialPiece() {
  return {
    id: generateRowId(),
    quantity: '',
    weight: '',
    width: '',
    height: ''
  }
}
```

# validate()
Returns an array with error enumerations for given descriptor/s

### Syntax:
```javascript
validate(...descriptor)
```

### Parametre:
#### descriptor
The descriptor/s containing the values to be validated

### Descriptor Properties:
#### enumeration
The value enumeration  
*String or Number*
#### value
The value to validate  
*String, Number, Boolean, FileObject*
#### pattern
The pattern to follow or unfollow  
*Null, Undefined, RegExp, String, Array, Boolean*
#### elementType
The element type containing the value  
*Anything else than a match with string cases will be ignored*
#### identifier
The string or number representing the row a certain field belongs to  
*Undefined, String, Number*
#### optional
The boolean value determining if the field to validate is mandatory or not  
*Any value will be converted to boolean true*

*Functions returning one of the allowed types can be provided as property

# toggleErrorClass()
Returns the string 'error' if the enumerated value is faulty

### Syntax:
```javascript
toggleErrorClass(enumeration, errorArray, identifier?)
```

### Parametres:
#### enumeration
The value enumeration  
*String or Number*
#### errorArray
The error array containing the error enumerations  
*Array*
#### identifier (optional)
The row identifier for a given set of values  
*Undefined, String, Number*

# generateRowId()
Returns a string id useful in case of values repeated across multiple rows

### Syntax:
```javascript
generateRowId()
```

# pattern{}
Provides some default regex patterns
